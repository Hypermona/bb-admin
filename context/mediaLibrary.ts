import { useState } from "react";
import { createContainer } from "unstated-next";

const set = (keyName: string, keyValue: string[], ttl: number) => {
  const data = {
    value: keyValue,
    ttl: Date.now() + ttl * 60 * 60 * 1000,
  };
  localStorage?.setItem(keyName, JSON.stringify(data));
};

const get = (keyName: string): string[] => {
  const data = localStorage?.getItem(keyName);
  if (!data) {
    return [];
  }
  const item = JSON.parse(data);
  if (Date.now() > item.ttl) {
    localStorage.removeItem(keyName);
    return [];
  }
  return item.value;
};

function useMedia(initialState = 0) {
  let [media, setMedia] = useState<string[]>(get("media"));
  let addMedia = (value: string[]) => {
    set("media", [...media, ...value], 72);
    console.log("meeeedia", get("media"));
    setMedia((prev) => [...prev, ...value]);
  };
  return { media, addMedia };
}

const MediaLibrary = createContainer(useMedia);
export default MediaLibrary;
