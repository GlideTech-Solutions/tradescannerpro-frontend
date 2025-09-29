import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = "https://crypto-scanner-backend-production.up.railway.app/api";



export async function GET(request) {
	try {
		// Try to get token from Authorization header first
		const authHeader = request.headers.get("authorization");
		let token = null;
		
		if (authHeader?.startsWith("Bearer ")) {
			token = authHeader.substring(7);
		} else {
			// Fallback to cookies
			const cookieStore = await cookies();
			token = cookieStore.get("auth_token")?.value;
		}

		if (!token) {
			return NextResponse.json(
				{ error: "Authentication required" },
				{ status: 401 },
			);
		}

		// Always call the external API to get all data
		const externalApiUrl = `${API_BASE_URL}/crypto/scan`;

		// Forward the request to the external API
		const response = await fetch(externalApiUrl, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		
		const data = await response.json().catch(async (jsonError) => {
			console.error("Failed to parse JSON response:", jsonError);
			const textResponse = await response.text();
			return { error: "Invalid JSON response from server", rawResponse: textResponse };
		});

		if (!response.ok) {
			// If external API returns 401, it means token is invalid/expired
			if (response.status === 401) {
				return NextResponse.json(
					{ error: "Session expired. Please log in again." },
					{ status: 401 },
				);
			}
			
			// Log detailed error information for debugging
			console.error("External API error details:");
			console.error("- Status:", response.status);
			console.error("- Status Text:", response.statusText);
			console.error("- Response Data:", data);
			console.error("- Request URL:", externalApiUrl);
			
			return NextResponse.json(
				{ 
					error: data.error || data.message || `External API error: ${response.status} ${response.statusText}`,
					details: data,
					status: response.status
				}, 
				{ status: response.status }
			);
		}

		// Transform score to strength for each coin
		if (data && Array.isArray(data.data)) {
			data.data = data.data.map((coin) => ({
				...coin,
				// Keep original score for reference if needed
				originalScore: coin.score,
			}));
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error("Crypto scan API error:", error);
		console.error("Error stack:", error.stack);
		console.error("Error name:", error.name);
		console.error("Error message:", error.message);
		
		// Check if it's a network error
		if (error.name === 'TypeError' && error.message.includes('fetch')) {
			console.error("Network error detected - external API might be down");
			return NextResponse.json(
				{ 
					error: "Unable to connect to crypto scanner service. Please try again later.",
					type: "network_error",
					details: error.message
				},
				{ status: 503 },
			);
		}
		
		return NextResponse.json(
			{ 
				error: "Internal server error",
				details: error.message,
				type: "internal_error"
			},
			{ status: 500 },
		);
	}
}
