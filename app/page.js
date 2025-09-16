"use client";

import ExplosiveMoveDetection from "../components/ExplosiveMoveDetection/ExplosiveMoveDetection";
import ThemeToggleBtn from "../components/ThemeToggleBtn";

export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <ThemeToggleBtn />

        <ExplosiveMoveDetection />
      </div>
    </main>
  );
}
