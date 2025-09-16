"use client";

import ChildMoveOpportunities from "../../components/ChildMoveOpportunities/ChildMoveOpportunities";
import ThemeToggleBtn from "../../components/ThemeToggleBtn";

export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <ThemeToggleBtn />

        <ChildMoveOpportunities />
      </div>
    </main>
  );
}
