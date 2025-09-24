import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL =
	"https://crypto-scanner-backend-production.up.railway.app/api";



export async function GET() {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			return NextResponse.json(
				{ error: "Authentication required" },
				{ status: 401 },
			);
		}

		// Forward the request to the external API
		const response = await fetch(`${API_BASE_URL}/crypto/scan`, {
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
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
