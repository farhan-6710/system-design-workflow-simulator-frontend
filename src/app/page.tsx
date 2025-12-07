"use client";

import { useState } from "react";
import { DashboardView } from "@/components/main-sections/dashboard/DashboardView";
import { AIResearchView } from "@/components/main-sections/ai-assistant/AIResearchView";
import { AnalyticsView } from "@/components/main-sections/analytics/AnalyticsView";
import { MainLayout } from "@/app/MainLayout";
import WorkflowStudio from "@/components/main-sections/workflow-studio/WorflowStudio";
import CodePlayground from "@/components/main-sections/code-playground/CodePlayground";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("system-design");

  const renderPage = () => {
    switch (currentPage) {
      case "my-progress":
        return <DashboardView onNavigate={setCurrentPage} />;
      case "code-playground":
        return <CodePlayground />;
      case "system-design":
        return <WorkflowStudio />;
      case "challenges":
        return <AnalyticsView />;
      case "recruiter-assessment":
        return <AIResearchView />;
      case "settings":
        return <AnalyticsView />;
      default:
        return <WorkflowStudio />;
    }
  };
  return (
    <MainLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
}
