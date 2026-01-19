import React, { useRef } from "react";
import MonacoEditor, { OnMount, BeforeMount } from "@monaco-editor/react";

interface EditorProps {
  initialCode: string;
  onChange: (val: string) => void;
  editorRef: React.MutableRefObject<any | null>;
}

export const Editor: React.FC<EditorProps> = ({
  initialCode,
  onChange,
  editorRef,
}) => {
  const monacoRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const handleBeforeMount: BeforeMount = (monaco) => {
    // Define a custom theme that matches the reference image (Blue/Purple style)
    monaco.editor.defineTheme("vidforge-dark", {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "keyword", foreground: "79c0ff" },
    { token: "type", foreground: "79c0ff" },
    { token: "string", foreground: "ffa657" },
    { token: "number", foreground: "79c0ff" },
    { token: "identifier", foreground: "e6edf3" },
    { token: "identifier.function", foreground: "79c0ff" },
    { token: "delimiter", foreground: "e6edf3" },
    { token: "comment", foreground: "8b949e" },
    { token: "variable.parameter", foreground: "ffa657" },
  ],
  colors: {
    "editor.background": "#00000000",
    "editor.lineHighlightBackground": "#ffffff0a",
    "editorCursor.foreground": "#e6edf3",
    "editor.selectionBackground": "#1f6feb40",
  },
});

  };

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  return (
    <div className="h-full w-full">
      <MonacoEditor
        height="100%"
        defaultLanguage="javascript"
        defaultValue={initialCode}
        theme="vidforge-dark"
        beforeMount={handleBeforeMount}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: '"JetBrains Mono", Menlo, monospace',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          roundedSelection: false,
          cursorStyle: "line",
          contextmenu: false,
        }}
      />
    </div>
  );
};
