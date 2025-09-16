"use client";

import PermissionPage from "../../components/PermissionPage/PermissionPage";
import ThemeToggleBtn from "../../components/ThemeToggleBtn";

export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <ThemeToggleBtn />

        <PermissionPage />
      </div>
    </main>
  );
}
