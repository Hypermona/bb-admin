"use Client";
import React, { useId } from "react";
import { FormControl, FormDescription, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { FILE, RICH_TEXT, TEXTAREA } from "@/lib/constants";
import RichEditor from "../Editor/RichEditor";


type Props = {
  field: ControllerRenderProps<FieldValues, string>;
  f: FormField;
};

const RenderFieldByType = ({ field, f }: Props) => {
  switch (f.type) {
    case TEXTAREA:
      return <Textarea {...field} />;
    case FILE:
      return <Input type={f.type} onChange={(e) => field.onChange(e.target.files)} />;
    case RICH_TEXT: return <RichEditor />
      break;
    default:
      return <Input type={f.type} placeholder="shadcn" {...field} />;
      break;
  }
};

function Field(props: Props) {
  return (
    <FormItem>
      <FormLabel>{props.f.label}</FormLabel>
      <FormControl>
        <RenderFieldByType {...props} />
      </FormControl>
      {/* <FormDescription></FormDescription> */}
      {/* <FormMessage /> */}
    </FormItem>
  );
}

export default Field;
