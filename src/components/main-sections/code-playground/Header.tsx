import React from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onRun: () => void;
  status?: string;
}

export const Header: React.FC<HeaderProps> = ({ onRun, status = "Ready" }) => {
  return (
    <header className="h-12 border-b border-border flex items-center justify-between px-4 shrink-0 select-none bg-code-editor-backgroundTwo">
      {/* Window Controls */}
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50 hover:bg-red-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/50 hover:bg-yellow-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/50 hover:bg-green-500 transition-colors"></div>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 opacity-60 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            ></path>
          </svg>
          <span className="text-xs font-medium tracking-wide opacity-80 text-muted-foreground">
            codePlayground.js
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="text-[10px] font-mono">
          {status}
        </Badge>
        <Button
          onClick={onRun}
          size="sm"
          className="bg-gradient-primary text-white hover:opacity-90 transition-opacity font-bold text-xs"
        >
          <Play className="w-3 h-3 mr-1.5" />
          RUN
        </Button>
      </div>
    </header>
  );
};
