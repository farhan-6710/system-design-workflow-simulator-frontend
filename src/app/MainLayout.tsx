"use client";

import { useState, useEffect } from "react";
import SidebarLeft from "@/components/sidebar-left/SidebarLeft";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainHeader from "../components/header/MainHeader";
import { useWorkflowStore } from "@/stores/workflowStore";

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const getIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 1023;
};

export function MainLayout({
  children,
  currentPage,
  onNavigate,
}: MainLayoutProps) {
  // ✅ initialize correctly before first paint
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarLeftExpanded, setSidebarLeftExpanded] = useState(true);
  console.log("isSidebarLeftExpanded:", isSidebarLeftExpanded);

  useEffect(() => {
    setIsMounted(true);

    const isMobile = window.innerWidth <= 1023;
    setSidebarLeftExpanded(!isMobile);
  }, []);

  const setSidebarRightExpanded = useWorkflowStore(
    (state) => state.setSidebarRightExpanded
  );
  const setSelectedTab = useWorkflowStore((state) => state.setSelectedTab);

  // Auto-expand right sidebar on system-design
  // useEffect(() => {
  //   if (currentPage === "system-design") {
  //     setSidebarRightExpanded(true);
  //     setSelectedTab("ai-assistant");
  //   }
  // }, [currentPage, setSidebarRightExpanded, setSelectedTab]);

  const handleToggleSidebar = () => {
    setSidebarLeftExpanded((prev) => !prev);
  };

  if (!isMounted) {
    // ✅ Server HTML === Client first render
    return null;
  }

  const showTooltips = !isSidebarLeftExpanded;

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        {/* Mobile Sidebar Overlay */}
        {getIsMobile() && (
          <div
            className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
              isSidebarLeftExpanded
                ? "opacity-50 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setSidebarLeftExpanded(false)}
          />
        )}

        <SidebarLeft
          isSidebarLeftExpanded={isSidebarLeftExpanded}
          showTooltips={showTooltips}
          currentPage={currentPage}
          onNavigate={onNavigate}
          handleToggleSidebar={handleToggleSidebar}
          isMobile={getIsMobile()}
        />

        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <MainHeader onToggle={handleToggleSidebar} />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
}
