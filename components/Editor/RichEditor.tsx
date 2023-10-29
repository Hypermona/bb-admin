import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { EditorState, LexicalEditor } from "lexical";
import * as React from "react";

import { SettingsContext } from "./context/SettingsContext";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import Editor from "./Editor";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import { TableContext } from "./plugins/TablePlugin";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
import { LoadInitialEditorState } from "./LoadInitialEditorState";

console.warn(
  "If you are profiling the playground app, please ensure you turn off the debug view. You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting."
);

function App({ onChange, value }: { onChange: (v: any) => void; value: string }): JSX.Element {
  const initialConfig = {
    editorState: null,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };
  const onStateChange = (editorState: EditorState, editor: LexicalEditor) => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      onChange(htmlString);
    });
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            <div className="editor-shell">
              <LoadInitialEditorState initialContent={value} />
              <Editor />
            </div>
            <OnChangePlugin onChange={onStateChange} />
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}

export default function PlaygroundApp({
  onChange,
  value,
}: {
  onChange: (v: any) => void;
  value: string;
}): JSX.Element {
  return (
    <SettingsContext>
      <App onChange={onChange} value={value} />
    </SettingsContext>
  );
}
