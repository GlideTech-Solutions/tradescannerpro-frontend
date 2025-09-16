"use client";

import { Suspense } from "react";
import ChildMoveOpportunities from "../../components/ChildMoveOpportunities/ChildMoveOpportunities";
import ThemeToggleBtn from "../../components/ThemeToggleBtn";
import Loading from "../../components/Loading";

export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <ThemeToggleBtn />

        <Suspense fallback={<Loading message="Loading coin details..." />}>
          <ChildMoveOpportunities />
        </Suspense>
      </div>
    </main>
  );
}
