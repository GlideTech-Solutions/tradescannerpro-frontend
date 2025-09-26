"use client";

import ChangePassword from "@/components/ChnagePassword/ChangePassword";
import ThemeToggleBtn from "../../components/ThemeToggleBtn";

export default function Home() {
	return (
		<main className="container">
			<div className="content">
				<ThemeToggleBtn />
				<ChangePassword />
			</div>
		</main>
	);
}
