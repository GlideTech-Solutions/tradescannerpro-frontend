"use client";

import Login from "@/components/Login/login";
import ThemeToggleBtn from "@/components/ThemeToggleBtn";

export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <ThemeToggleBtn />

        <Login />
      </div>
    </main>
  );
}
