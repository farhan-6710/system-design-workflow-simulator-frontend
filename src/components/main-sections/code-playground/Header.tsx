import React from "react";

interface HeaderProps {
  onRun: () => void;
  status?: string;
}

export const Header: React.FC<HeaderProps> = ({ onRun, status = "Ready" }) => {
  return (
    <header className="h-12 border-b border-code-editor-border flex items-center justify-between px-4 shrink-0 select-none">
      {/* Window Controls */}
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 opacity-60 text-code-editor-gray"
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
          <span className="text-xs font-medium tracking-wide opacity-80 text-code-editor-gray">
            codePlayground.js
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-code-editor-gray">{status}</span>
        <button
          onClick={onRun}
          className="flex items-center gap-1.5 px-4 py-1.5 text-[#17191d] bg-code-editor-green hover:brightness-110 text-xs font-bold rounded transition-transform active:scale-95 shadow-lg"
        >
          ▶ RUN
        </button>
      </div>
    </header>
  );
};
