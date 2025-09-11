"use client";

import MoveOpportunities from "@/components/MoveOpportunities/MoveOpportunities";
import ThemeToggleBtn from "@/components/ThemeToggleBtn";

export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <ThemeToggleBtn />

        <MoveOpportunities />
      </div>
    </main>
  );
}
