"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronUp, LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { AuthDialog } from "../auth/AuthDialog";
import { ConfirmationModal } from "../atoms/ConfirmationModal";
import { getUserInitials, getUserDisplayName } from "@/utils/auth/userUtils";
import { toast } from "sonner";

interface SidebarFooterProps {
  isSidebarLeftExpanded: boolean;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  isSidebarLeftExpanded,
}) => {
  const { user, loading, signOut } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to sign out";
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="px-2.5 py-3 border-t border-slate-200 dark:border-slate-800"
      >
        <div className="animate-pulse">
          <div className="h-10 bg-slate-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </motion.div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="px-2.5 py-3 border-t border-slate-200 dark:border-slate-800"
      >
        <Button
          onClick={() => setAuthDialogOpen(true)}
          className={`${
            isSidebarLeftExpanded
              ? "w-full justify-center h-9 px-3"
              : "w-10 h-10 p-0 justify-center"
          } bg-primary hover:bg-gradient-primary/70 text-white cursor-pointer rounded-lg`}
        >
          {isSidebarLeftExpanded ? "Get Started" : "GS"}
        </Button>
        <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="px-2.5 py-3 border-t border-slate-200 dark:border-slate-800"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`${
              isSidebarLeftExpanded
                ? "w-full justify-between h-9 px-3"
                : "w-10 h-10 p-0 justify-center"
            } rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors`}
          >
            <div
              className={`flex items-center ${
                isSidebarLeftExpanded ? "gap-2.5" : "justify-center"
              }`}
            >
              <Avatar className="w-7 h-7">
                <AvatarFallback className="text-xs bg-gradient-to-br from-cyan-500 to-purple-500 text-white font-semibold">
                  {getUserInitials(user)}
                </AvatarFallback>
              </Avatar>
              {isSidebarLeftExpanded && (
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {getUserDisplayName(user)}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-gray-400">
                    {user.email}
                  </span>
                </div>
              )}
            </div>
            {isSidebarLeftExpanded && (
              <ChevronUp className="w-4 h-4 text-slate-500 dark:text-gray-400" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={isSidebarLeftExpanded ? "end" : "start"}
          className="w-52"
        >
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogoutClick}
            className="text-red-600 cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationModal
        open={showLogoutModal}
        onOpenChange={setShowLogoutModal}
        title="Logout"
        description="Are you sure you want to logout from your account?"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutModal(false)}
        confirmText="Logout"
        cancelText="Cancel"
        variant="destructive"
      />
    </motion.div>
  );
};
