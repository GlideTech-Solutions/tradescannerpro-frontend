"use client";

import Dashboard from "@/components/Dashboard/Dashboard";
import ExplosiveMoveDetection from "../components/ExplosiveMoveDetection/ExplosiveMoveDetection";
import ThemeToggleBtn from "../components/ThemeToggleBtn";

export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <ThemeToggleBtn />

        <Dashboard />
      </div>
    </main>
  );
}
