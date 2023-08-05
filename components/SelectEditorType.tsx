import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { EDITOR_TYPES } from "@/lib/constants";
import Content from "@/context/content";

type Props = {};

function SelectEditorType({}: Props) {
  const {
    content: { type },
    changeContentType,
  } = Content.useContainer();

  const handleSelectChange = (value) => {
    changeContentType(value);
  };
  return (
    <>
      <Select onValueChange={handleSelectChange} value={type}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {EDITOR_TYPES.map((et) => (
            <SelectItem value={et.value} key={et.value}>
              {et.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectEditorType;
