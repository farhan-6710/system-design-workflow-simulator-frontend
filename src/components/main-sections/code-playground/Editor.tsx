import React, { useEffect } from "react";
// We need to import ace-builds for types, but initialization happens dynamically
import "ace-builds/src-noconflict/ace";
import type { Ace } from "ace-builds";

interface EditorProps {
  initialCode: string;
  onChange: (val: string) => void;
  editorRef: React.MutableRefObject<Ace.Editor | null>;
}

export const Editor: React.FC<EditorProps> = ({ initialCode, onChange, editorRef }) => {
  useEffect(() => {
    // Dynamically load Ace and Theme/Mode to avoid SSR issues
    const initEditor = async () => {
      const ace = (await import("ace-builds")).default;
      await import("ace-builds/src-noconflict/mode-javascript");
      await import("ace-builds/src-noconflict/theme-one_dark");

      // Override styles via CSS in globals.css, but we set the ID here
      const editor = ace.edit("editor");
      editor.setTheme("ace/theme/one_dark");
      editor.session.setMode("ace/mode/javascript");
      
      editor.setOptions({
        fontSize: "14px",
        fontFamily: '"JetBrains Mono", Menlo, monospace',
        showPrintMargin: false,
        fixedWidthGutter: true,
        displayIndentGuides: true,
        scrollPastEnd: 0.5,
      });

      editor.setValue(initialCode, -1);
      
      editor.on("change", () => {
        onChange(editor.getValue());
      });

      editorRef.current = editor;
    };

    initEditor();

    return () => {
        // Cleanup if necessary
    }
  }, [editorRef, initialCode, onChange]);

  // Important: The styles for .ace_editor are in globals.css
  return <div id="editor" className="absolute inset-0" />;
};