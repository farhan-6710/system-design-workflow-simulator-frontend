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
      <div className="px-4 py-2 border-b border-border flex justify-between items-center select-none bg-background">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Console
        </span>
        <button
          onClick={onClear}
          className="text-[10px] text-red-400 hover:text-red-500 hover:bg-red-500/10 px-2 py-0.5 rounded transition-all"
        >
          Clear
        </button>
      </div>

      {/* Logs Output */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1 relative bg-card/30">
        {logs.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-sm text-muted-foreground/50">
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
    log: "text-slate-300 border-slate-600",
    error: "text-red-400 border-red-500/50 bg-red-500/10",
    warn: "text-yellow-400 border-yellow-500/50 bg-yellow-500/10",
    info: "text-blue-400 border-blue-500/50 bg-blue-500/10",
  };

  return (
    <div
      className={`pl-3 py-1 mb-1 text-sm font-mono border-l-2 hover:bg-white/5 transition-colors rounded-r ${
        styles[log.type]
      }`}
    >
      <pre className="whitespace-pre-wrap font-sans leading-relaxed text-foreground-muted">
        {log.message.map(formatLogArgument).join(" ")}
      </pre>
    </div>
  );
};
