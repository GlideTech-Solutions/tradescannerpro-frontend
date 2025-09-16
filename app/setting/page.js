"use client";

import SettingPage from "../../components/SettingPage/SettingPage";
import ThemeToggleBtn from "../../components/ThemeToggleBtn";

export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <ThemeToggleBtn />

        <SettingPage />
      </div>
    </main>
  );
}
