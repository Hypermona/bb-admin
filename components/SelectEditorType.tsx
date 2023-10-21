import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { EDITOR_TYPES } from "@/lib/constants";
import Content from "@/context/content";
import { useSearchParams } from "next/navigation";

type Props = {};

function SelectEditorType({}: Props) {
  const params = useSearchParams();
  const _type = params.get("type");
  const isLocked = params.get("isLocked");
  console.log(_type, isLocked);
  useEffect(() => {
    changeContentType(_type);
  }, [_type]);
  const {
    content: { type },
    changeContentType,
  } = Content.useContainer();

  const handleSelectChange = (value) => {
    changeContentType(value);
  };
  return (
    <>
      <Select onValueChange={handleSelectChange} value={type} disabled={JSON.parse(isLocked!)}>
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
