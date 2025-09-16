"use client";

import MarketBreakouts from "../../components/MarketBreakouts/MarketBreakouts";
import ThemeToggleBtn from "../../components/ThemeToggleBtn";

export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <ThemeToggleBtn />

        <MarketBreakouts />
      </div>
    </main>
  );
}
