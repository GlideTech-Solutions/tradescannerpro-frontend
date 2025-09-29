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

		// Call your local API to get top 5 cryptocurrencies
		const externalApiUrl = `${API_BASE_URL}/crypto/top5`;

		// Forward the request to the external API
		const response = await fetch(externalApiUrl, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();

		if (!response.ok) {
			// If external API returns 401, it means token is invalid/expired
			if (response.status === 401) {
				return NextResponse.json(
					{ error: "Session expired. Please log in again." },
					{ status: 401 },
				);
			}
			return NextResponse.json(data, { status: response.status });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error("Crypto top5 API error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
