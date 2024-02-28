import React, { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { EDITOR_TYPES } from "@/lib/constants";
import Content from "@/context/content";
import { useSearchParams } from "next/navigation";

type Props = {};

function SelectEditorType() {
  const params = useSearchParams();
  const isLocked = params.get("isLocked");
  console.log(isLocked);
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
