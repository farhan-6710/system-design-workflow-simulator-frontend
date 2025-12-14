"use client";

import { useState, useEffect } from "react";
import SidebarLeft from "@/components/sidebar-left/SidebarLeft";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainHeader from "../components/header/MainHeader";
import { useWorkflowStore } from "@/stores/workflowStore";

import { useMediaQuery } from "@/hooks/use-media-query";

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function MainLayout({
  children,
  currentPage,
  onNavigate,
}: MainLayoutProps) {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [isSidebarLeftExpanded, setSidebarLeftExpanded] = useState(true);

  // Collapse sidebar automatically on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarLeftExpanded(false);
    } else {
      setSidebarLeftExpanded(true);
    }
  }, [isMobile]);

  const setSidebarRightExpanded = useWorkflowStore(
    (state) => state.setSidebarRightExpanded
  );
  const setSelectedTab = useWorkflowStore((state) => state.setSelectedTab);

  // Auto-collapse sidebar when navigating to system-design
  useEffect(() => {
    if (currentPage === "system-design") {
      // setSidebarLeftExpanded(false);
      setSidebarRightExpanded(true);
      setSelectedTab("ai-assistant");
    }
  }, [currentPage, setSidebarRightExpanded, setSelectedTab]);

  const handleToggleSidebar = () => {
    setSidebarLeftExpanded(!isSidebarLeftExpanded);
  };

  // Simple: show tooltips when sidebar is collapsed
  const showTooltips = !isSidebarLeftExpanded;

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        {/* Mobile Sidebar Overlay */}
        {isMobile && (
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
          isMobile={isMobile}
        />

        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <MainHeader onToggle={handleToggleSidebar} />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
        
      </div>
    </TooltipProvider>
  );
}
