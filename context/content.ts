import { BLOG } from "@/lib/constants";
import { useState } from "react";
import { createContainer } from "unstated-next";

function useCounter(initialState = 0) {
  let [content, setContent] = useState({ type: BLOG });
  let changeContentType = (type) => setContent((prev) => ({ ...prev, type }));
  return { content, changeContentType };
}

const Content = createContainer(useCounter);
export default Content;
