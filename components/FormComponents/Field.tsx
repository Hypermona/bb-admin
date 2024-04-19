"use Client";
import React, { useId, useRef } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import {
  ARRAY_FEILD,
  FAQ,
  FEATURES,
  FILE,
  IMAGE,
  MULTI_SELECT,
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
import { Card } from "../ui/card";
import SelectSearch from "../SelectSearch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { getData } from "@/lib/dataservices";
import useSWR from "swr";
import MultipleSearchSelect from "../multipleSearchSelect";
import AddFeature from "../addFeature";
import ImageUrlUpload from "../ImageUrlUpload";
import { Checkbox } from "../ui/checkbox";

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

const SelectWrapper = ({ field, f, width }) => {
  return (
    <div className={`w-[${width}px]`}>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger>
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
    </div>
  );
};

const RenderFeatures = ({ field, f }: Props) => {
  const { control } = useFormContext();
  return (
    <Card className="p-2">
      {f.properties.map((p) =>
        p.category === control._formValues.category ? (
          <div key={p.name} className="flex items-center mb-2 w-full">
            <FormLabel className="w-[200px]">{p.label}</FormLabel>
            <FormField
              control={control}
              name={`${f.name}.${p.name}.standout`}
              render={({ field }) => (
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              )}
            />
            <FormField
              key={p.name}
              control={control}
              name={`${f.name}.${p.name}.value`}
              render={({ field }) =>
                p.type === "select" ? (
                  <SelectSearch
                    selected={field.value}
                    handleSelect={(value) => field.onChange(value)}
                    // options={processorsList}
                    NoResult={{
                      filename: "tags",
                      apiPath: "tags",
                    }}
                    // mutate={mutate}
                  />
                ) : (
                  <Input {...field} />
                )
              }
            />
          </div>
        ) : null
      )}
    </Card>
  );
};

const RenderFieldByType = ({ field, f }: Props) => {
  switch (f.type) {
    case IMAGE:
      return <ImageUrlUpload field={field} />;
    case TEXTAREA:
      return <Textarea {...field} />;
    case FILE:
      return <Input type={f.type} onChange={(e) => field?.onChange(e.target.files)} />;
    case RICH_TEXT:
      return <RichEditor onChange={(v) => field?.onChange(v)} value={field?.value} />;
    case SELECT:
      return <SelectWrapper field={field} f={f} width={180} />;
    case FAQ:
      return (
        <ArrayField
          fieldName="faq"
          initialValues={fqaInitialValues}
          properties={faqProperties}
          onSubmit={() => {}}
        />
      );
    case MULTI_SELECT:
      return (
        <MultipleSearchSelect
          selected={field?.value}
          handleSelect={(v) => field?.onChange(v)}
          optionsPath="tags/tags"
          NoResult={{ filename: "tags", apiPath: "tags" }}
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
    case FEATURES:
      return <RenderFeatures field={field} f={f} />;
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
