"use client";

import React, { useRef, useCallback } from "react";
import type { Ace } from "ace-builds";
import { useConsole } from "@/hooks/code-playground/useConsole";
import { useResizable } from "@/hooks/code-playground/useResizable";
import { DEFAULT_CODE } from "@/constants/code-playground/defaultCode";
import { Header } from "./Header";
import { Editor } from "./Editor";
import { Console } from "./Console";

export default function CodePlayground() {
  const { logs, addLog, clearLogs } = useConsole();
  const { heightPercent, containerRef, startDrag, isDragging } =
    useResizable(60);

  const editorInstance = useRef<Ace.Editor | null>(null);
  const codeRef = useRef(DEFAULT_CODE);

  // Resize the Ace editor when the split pane size changes
  React.useEffect(() => {
    if (editorInstance.current) {
      editorInstance.current.resize();
    }
  }, [heightPercent]);

  const handleCodeChange = useCallback((val: string) => {
    codeRef.current = val;
  }, []);

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
    <div className="p-12 flex-1 h-full flex items-center justify-center font-sans overflow-hidden text-slate-300 bg-code-editor-background">
      {/* Main Window: Fixed 90vw width and 80vh height */}
      <div className="border border-code-editor-border w-full h-full flex flex-col overflow-hidden bg-code-editor-backgroundTwo rounded-2xl">
        <Header onRun={handleRun} status={`${logs.length} logs`} />

        <div
          ref={containerRef}
          className="flex-1 flex flex-col min-h-0 relative"
          id="split-container"
        >
          {/* Top: Editor */}
          <div
            className="relative min-h-[50px]"
            style={{
              height: `${heightPercent}%`,
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
            className="h-3 border-y border-code-editor-border cursor-row-resize flex items-center justify-center z-50 hover:bg-code-editor/80 group shrink-0"
          >
            <div className="w-10 h-1 bg-code-editor-border rounded-sm transition-all duration-200 group-hover:w-[50px] group-hover:bg-code-editor-blue" />
          </div>

          {/* Bottom: Console */}
          <Console logs={logs} onClear={clearLogs} />
        </div>
      </div>
    </div>
  );
}
