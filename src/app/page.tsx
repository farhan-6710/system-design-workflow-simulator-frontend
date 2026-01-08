"use client";

import { useState } from "react";
import { MainLayout } from "@/app/MainLayout";
import WorkflowStudio from "@/components/main-sections/workflow-studio/WorflowStudio";
import CodePlayground from "@/components/main-sections/code-playground/CodePlayground";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("system-design");

  const renderPage = () => {
    switch (currentPage) {
      case "my-progress":
        return <WorkflowStudio />;
      case "code-playground":
        return <CodePlayground />;
      case "system-design":
        return <WorkflowStudio />;
      case "challenges":
        return <WorkflowStudio />;
      case "recruiter-assessment":
        return <WorkflowStudio />;
      case "settings":
        return <WorkflowStudio />;
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
