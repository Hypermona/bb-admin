import { $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $getRoot, $insertNodes } from "lexical";
import { $createRootNode } from "lexical/nodes/LexicalRootNode";
import React from "react";

type Props = { initialContent?: string };

export const LoadInitialEditorState = ({ initialContent }: Props) => {
  const [editor] = useLexicalComposerContext();
  console.log(initialContent);
  React.useEffect(() => {
    if (!initialContent) {
      return;
    }
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialContent, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      console.log("ehyy", dom, nodes, initialContent);
      const divNode = $createParagraphNode();
      nodes.forEach((node) => {
        divNode.append(node);
      });
      $insertNodes(nodes);
    });
  }, []);
  return null;
};
