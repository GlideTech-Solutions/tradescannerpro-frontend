"use client";

import { Suspense } from "react";
import MarketBreakouts from "../../components/MarketBreakouts/MarketBreakouts";
import ThemeToggleBtn from "../../components/ThemeToggleBtn";

export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <ThemeToggleBtn />

        <Suspense fallback={<div>Loading...</div>}>
          <MarketBreakouts />
        </Suspense>
      </div>
    </main>
  );
}
