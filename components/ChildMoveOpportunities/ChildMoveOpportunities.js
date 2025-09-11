import React from "react";
import PageHeader from "../PageHeader/PageHeader";
import "./ChildMoveOpportunities.scss";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import ChartCard from "./ChartCard";

export default function ChildMoveOpportunities() {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  return (
    <div>
      <PageHeader />

      <div className="moveOpportunities-child-section">
        <div className="moveOpportunities-child-details-alignment">
          <div
            className="moveOpportunities-child-child-back-alignment"
            onClick={() => {
              router.push("/move-opportunities");
            }}
          >
            <img src="/assets/icons/arrow-small-left.svg" alt="left arrow" />
            <span>Back to Top Explosive</span>
          </div>

          <div
            className={`moveOpportunities-child-box-alignment ${
              isDarkMode ? "dark" : ""
            }`}
          >
            <div className="moveOpportunities-child-chart-alignment">
              <main >
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                  <ChartCard />
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
