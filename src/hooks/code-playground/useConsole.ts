import { useState, useCallback } from "react";

export type LogType = "log" | "error" | "warn" | "info";

export interface LogEntry {
  type: LogType;
  message: unknown[];
  timestamp: string;
}

export const useConsole = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((type: LogType, args: unknown[]) => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    setLogs((prev) => [...prev, { type, message: args, timestamp }]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return { logs, addLog, clearLogs };
};
