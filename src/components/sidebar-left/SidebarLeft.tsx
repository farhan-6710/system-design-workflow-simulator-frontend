import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarCredits } from "./SidebarCredits";
import { SidebarFooter } from "./SidebarFooter";

interface SidebarLeftProps {
  isSidebarLeftExpanded: boolean;
  showTooltips: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
  handleToggleSidebar: () => void;
  isMobile?: boolean;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({
  isSidebarLeftExpanded,
  showTooltips,
  currentPage,
  onNavigate,
  handleToggleSidebar,
  isMobile = false,
}) => {
  const variants = isMobile
    ? {
        expanded: { x: 0, width: 264 },
        collapsed: { x: "-100%", width: 264 },
      }
    : {
        expanded: { width: 264, x: 0 },
        collapsed: { width: 74, x: 0 },
      };

  return (
    <motion.aside
      initial={false}
      animate={isSidebarLeftExpanded ? "expanded" : "collapsed"}
      variants={variants}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-20",
        isMobile ? "fixed left-0 top-0 bottom-0 z-50 h-full shadow-2xl" : "relative"
      )}
    >
      <SidebarHeader sidebarExpanded={isSidebarLeftExpanded} />

      <SidebarNavigation
        isSidebarLeftExpanded={isSidebarLeftExpanded}
        showTooltips={showTooltips}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      <SidebarCredits isSidebarLeftExpanded={isSidebarLeftExpanded} />

      <SidebarFooter isSidebarLeftExpanded={isSidebarLeftExpanded} />

      {isSidebarLeftExpanded && (
        <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleSidebar}
        className="absolute -right-3 top-24 h-7 w-7 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
      >
        {isSidebarLeftExpanded ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </Button>
      )}
    </motion.aside>
  );
};

export default SidebarLeft;
