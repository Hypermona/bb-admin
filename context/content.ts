import { APPS, BLOG } from "@/lib/constants";
import { useState } from "react";
import { createContainer } from "unstated-next";

interface Icontent {
  type: string;
  appDetails: Iapps;
}

function useCounter(initialState = 0) {
  let [content, setContent] = useState<Icontent>({
    type: BLOG,
    appDetails: APPS[0],
  });
  let changeContentType = (type) => setContent((prev) => ({ ...prev, type }));
  let changeAppDetails = (app) => setContent((prev) => ({ ...prev, appDetails: app }));
  return { content, changeContentType, changeAppDetails };
}

const Content = createContainer(useCounter);
export default Content;
