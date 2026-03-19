import React, { useEffect, useRef, useState } from "react";
import { LogEntry } from "@/hooks/code-playground/useConsole";
import { ChevronRight } from "lucide-react";

interface ConsoleProps {
  logs: LogEntry[];
  onClear: () => void;
}

export const Console: React.FC<ConsoleProps> = ({ logs, onClear }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background text-[#e6edf3] font-mono text-[13px] border-l border-border/50">
      <div className="px-3 py-1.5 border-b border-border/50 flex justify-between items-center select-none bg-muted/30">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          Console
        </span>
        <button
          onClick={onClear}
          className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {logs.map((log, i) => (
          <LogItem key={i} log={log} />
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};

const LogItem: React.FC<{ log: LogEntry }> = ({ log }) => {
  return (
    <div
      className={`border-b border-border/10 py-1.5 px-2 flex items-start group  transition-colors ${
        log.type === "error"
          ? "bg-red-500/10 border-red-500/20 text-red-200"
          : log.type === "warn"
            ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-200"
            : ""
      }`}
    >
      <div className="flex-1 flex flex-wrap gap-2">
        {/* Timestamp */}
        <span className="text-muted-foreground/40 text-[10px] select-none mt-0.5 font-sans">
          {log.timestamp}
        </span>
        {log.message.map((arg, i) => (
          <ObjectRenderer key={i} data={arg} isTopLevel={true} />
        ))}
      </div>
    </div>
  );
};

type InspectableData = Record<string, unknown> | unknown[];

const ObjectRenderer: React.FC<{ data: unknown; isTopLevel?: boolean }> = ({
  data,
  isTopLevel = false,
}) => {
  if (data === null) return <span className="text-[#a5d6ff]">null</span>;
  if (data === undefined)
    return <span className="text-[#79c0ff]">undefined</span>;
  if (typeof data === "boolean")
    return <span className="text-[#79c0ff]">{String(data)}</span>;
  if (typeof data === "number")
    return <span className="text-[#a5d6ff]">{data}</span>;
  if (typeof data === "string") {
    // Top level console.log("string") is not quoted
    return (
      <span className={isTopLevel ? "" : "text-[#a5d6ff]"}>
        {isTopLevel ? data : `"${data}"`}
      </span>
    );
  }

  if (typeof data === "function") {
    const functionName = (data as { name?: string }).name;
    return (
      <span className="italic">
        <span className="text-blue-400">ƒ</span> {functionName || "(anonymous)"}
        ()
      </span>
    );
  }

  if (typeof data === "object") {
    return <InteractiveObject data={data as InspectableData} />;
  }

  return <span>{String(data)}</span>;
};

const InteractiveObject: React.FC<{ data: InspectableData }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isArray = Array.isArray(data);
  const keys = Object.keys(data);
  const isEmpty = keys.length === 0;

  const getFullPreview = () => {
    // For collapsed state, show a bit more info if needed, but sticking to simple as per request
    if (isArray) {
      if (isEmpty) return "[]";
      // Try to show first few items
      const items = data.slice(0, 3).map((item) => {
        if (typeof item === "object" && item !== null) return "{…}";
        return String(item);
      });
      if (data.length > 3) items.push("…");
      return `(${data.length}) [${items.join(", ")}]`;
      // Actually standard chrome just shows `(4) [{...}, ...]` if objects
    }

    // Object: Show key: value pairs
    const entries = keys.slice(0, 5).map((key) => {
      const val = data[key as keyof typeof data];
      let valStr = String(val);
      if (typeof val === "string") valStr = `"${val}"`;
      if (typeof val === "object" && val !== null) {
        valStr = Array.isArray(val) ? `Array(${val.length})` : "{…}";
      }
      return `${key}: ${valStr}`;
    });

    return `{${entries.join(", ")}${keys.length > 5 ? ", …" : ""}}`;
  };

  if (isEmpty) {
    return (
      <span className="text-muted-foreground">{isArray ? "[]" : "{}"}</span>
    );
  }

  return (
    <div className="inline-block align-top">
      <div
        className="flex items-center cursor-pointer select-none group"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <ChevronRight
          size={14}
          className={`text-muted-foreground transform transition-transform mr-1 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
        <span className="text-foreground hover:text-blue-300">
          {/* Always show the full preview even when expanded */}
          {getFullPreview()}
        </span>
      </div>

      {isOpen && (
        <div className="pl-4 ml-[7px] border-l border-border/40 mt-1 space-y-0.5">
          {keys.map((key) => (
            <div key={key} className="flex items-start">
              <span className="text-purple-400 mr-2">{key}:</span>
              <ObjectRenderer data={data[key as keyof typeof data]} />
            </div>
          ))}
          {/* Array length visualization */}
          {isArray && (
            <div className="flex items-start opacity-50">
              <span className="text-muted-foreground mr-2">length:</span>
              <span className="text-blue-400">{data.length}</span>
            </div>
          )}
          {/* Prototype - simplified */}
          <div className="flex items-start opacity-30 mt-1">
            <span className="text-purple-400 mr-2">[[Prototype]]:</span>
            <span>Object</span>
          </div>
        </div>
      )}
    </div>
  );
};
