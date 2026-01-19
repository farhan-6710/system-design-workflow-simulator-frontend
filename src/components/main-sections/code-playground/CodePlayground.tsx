"use client";

import React, { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useConsole } from "@/hooks/code-playground/useConsole";
import { useResizable } from "@/hooks/code-playground/useResizable";
import { DEFAULT_CODE } from "@/constants/code-playground/defaultCode";
import { Header } from "./Header";
import { Editor } from "./Editor";
import { Console } from "./Console";

export default function CodePlayground() {
  const { logs, addLog, clearLogs } = useConsole();
  const { size, containerRef, startDrag, isDragging } = useResizable(
    50,
    "horizontal",
  );

  const editorInstance = useRef<any | null>(null);
  const codeRef = useRef(DEFAULT_CODE);

  const handleCodeChange = useCallback(
    (val: string) => {
      codeRef.current = val;
      clearLogs();
    },
    [clearLogs],
  );

  const handleRun = () => {
    clearLogs();
    const code = codeRef.current;

    const sandboxConsole = {
      log: (...args: unknown[]) => addLog("log", args),
      error: (...args: unknown[]) => addLog("error", args),
      warn: (...args: unknown[]) => addLog("warn", args),
      info: (...args: unknown[]) => addLog("info", args),
    };

    try {
      const runUserCode = new Function("console", code);
      runUserCode(sandboxConsole);
    } catch (err: unknown) {
      addLog("error", [(err as Error).message || String(err)]);
    }
  };

  return (
    // Outer container: fixed viewport, no scrollbars
    <div className="p-6 flex-1 h-full flex flex-col font-sans overflow-hidden bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Code Playground
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Experiment with JavaScript code in real-time.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex-1 min-h-0"
      >
        <Card className="w-full h-full flex flex-col overflow-hidden border-border bg-card/50 backdrop-blur-sm shadow-xl p-0 gap-0">
          <Header onRun={handleRun} status={`${logs.length} logs`} />

          <div
            ref={containerRef}
            className="flex-1 flex flex-row min-h-0 relative"
            id="split-container"
          >
            {/* Left: Editor */}
            <div
              className="relative min-w-[200px]"
              style={{
                width: `${size}%`,
                pointerEvents: isDragging.current ? "none" : "auto",
              }}
            >
              <Editor
                initialCode={DEFAULT_CODE}
                onChange={handleCodeChange}
                editorRef={editorInstance}
              />
            </div>

            {/* Resizer Handle */}
            <div
              id="resizer"
              onMouseDown={startDrag}
              className="w-1 hover:w-2 border-x border-border/50 cursor-col-resize flex items-center justify-center z-50 bg-background hover:bg-primary/20 transition-all delay-75 duration-300"
            />

            {/* Right: Console */}
            <div className="flex-1 min-w-0 bg-background">
              <Console logs={logs} onClear={clearLogs} />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
