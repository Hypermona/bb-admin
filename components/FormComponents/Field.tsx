"use Client";
import React, { useId } from "react";
import { FormControl, FormDescription, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import {
  ARRAY_FEILD,
  FAQ,
  FEATURES,
  FILE,
  PRODUCT_CARD,
  RICH_TEXT,
  SELECT,
  TEXTAREA,
} from "@/lib/constants";
import RichEditor from "../Editor/RichEditor";
import Products from "./Products";
import ArrayField from "./ArrayField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  field?: ControllerRenderProps<BlogOrProductCards, any>;
  f: FormField;
};

const faqProperties = [
  {
    name: "question",
    label: "Question",
    className: "w-[350px]",
  },
  {
    type: "textarea",
    name: "answer",
    label: "Answer",
    className: "w-[340px]",
  },
];

const fqaInitialValues = {
  question: "",
  answer: "",
};

const SelectWrapper = ({ field, f }) => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={f.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {f?.options?.map((ele) => (
            <SelectItem key={ele.value} value={ele.value}>
              {ele.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const RenderFieldByType = ({ field, f }: Props) => {
  switch (f.type) {
    case TEXTAREA:
      return <Textarea {...field} />;
    case FILE:
      return <Input type={f.type} onChange={(e) => field?.onChange(e.target.files)} />;
    case RICH_TEXT:
      return <RichEditor onChange={(v) => field?.onChange(v)} />;
    case SELECT:
      return <SelectWrapper field={field} f={f} />;
    case FAQ:
      return (
        <ArrayField
          fieldName="faq"
          initialValues={fqaInitialValues}
          properties={faqProperties}
          onSubmit={() => {}}
        />
      );
    case ARRAY_FEILD:
      return (
        <ArrayField
          fieldName={f.name}
          initialValues={f.initialvalue}
          properties={f.properties}
          onSubmit={() => {}}
        />
      );
    case PRODUCT_CARD:
      return <Products field={field} />;
    default:
      return <Input type={f.type} placeholder="shadcn" {...field} />;
  }
};

function Field(props: Props) {
  return (
    <FormItem>
      <FormLabel>{props.f.label}</FormLabel>
      <FormControl>
        <RenderFieldByType {...props} />
      </FormControl>
    </FormItem>
  );
}

export default Field;
