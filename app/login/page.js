"use client";

import Login from "../../components/Login/Login";
import ThemeToggleBtn from "../../components/ThemeToggleBtn";

export default function Home() {
  // Note: Authentication redirect is handled by middleware

  return (
    <main className="container">
      <div className="content">
        <ThemeToggleBtn />
        <Login />
      </div>
    </main>
  );
}
