import React, { useEffect, useRef } from "react";
import { LogEntry } from "@/hooks/code-playground/useConsole";
import { formatLogArgument } from "@/utils/code-playground/formatter";

interface ConsoleProps {
  logs: LogEntry[];
  onClear: () => void;
}

export const Console: React.FC<ConsoleProps> = ({ logs, onClear }) => {
  const endRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Console Header */}
      <div className="px-3 py-1 border-b border-code-editor-border flex justify-between items-center select-none bg-code-editor-background">
        <span className="text-[10px] font-bold uppercase tracking-wider text-code-editor-blue">
          Console
        </span>
        <button
          onClick={onClear}
          className="text-[10px] text-code-editor-red hover:opacity-100 opacity-60 transition-opacity"
        >
          Clear
        </button>
      </div>

      {/* Logs Output */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1 relative">
        {logs.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-sm text-code-editor-gray">
              Output will appear here...
            </span>
          </div>
        )}

        {logs.map((log, i) => (
          <LogItem key={i} log={log} />
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};

const LogItem = ({ log }: { log: LogEntry }) => {
  const styles = {
    log: "text-[#abb2bf] border-code-editor-gray",
    error:
      "text-code-editor-red border-code-editor-red bg-[rgba(220,106,116,0.1)]",
    warn: "text-[#e5c07b] border-[#e5c07b] bg-[rgba(229,192,123,0.1)]",
    info: "text-code-editor-blue border-code-editor-blue bg-[rgba(96,173,235,0.1)]",
  };

  return (
    <div
      className={`pl-3 py-1 mb-1 text-sm font-mono border-l-2 hover:bg-[#2c313a] transition-colors ${
        styles[log.type]
      }`}
    >
      <pre className="whitespace-pre-wrap font-sans leading-relaxed">
        {log.message.map(formatLogArgument).join(" ")}
      </pre>
    </div>
  );
};
