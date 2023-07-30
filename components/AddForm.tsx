"use Client";
import React, { useId, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverClose, PopoverTrigger } from "@radix-ui/react-popover";
import ToolBox from "./ToolBox";
import Field from "./FormComponents/Field";
import { BLOG_EDITOR_FIELDS, EDITOR_FIELDS } from "@/lib/constants";

function generateUUID() {
  let time = new Date().getTime();
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    time += performance.now();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let random = (time + Math.random() * 16) % 16 | 0;
    time = Math.floor(time / 16);
    return (c === "x" ? random : (random & 0x3) | 0x8).toString(16);
  });
}

function AddForm() {
  // const [formFields, setFormFields] = useState(DEFAULT_EDITOR_FIELDS);
  // const appendFormFields = (field: keyof EditorFields) => {
  //   setFormFields((prev) => [...prev, { ...EDITOR_FIELDS[field]}]);
  // };
  const form = useForm();
  const onSubmit = (d: any) => {
    console.log(d);
  };
  return (
    <Card className="w-[700px]">
      <CardHeader>
        <CardTitle>Add Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {BLOG_EDITOR_FIELDS.map((f: FormField, i: number) => (
              <FormField
                key={f.name + "_" + i}
                control={form.control}
                name={f.name + "_" + i}
                render={({ field }) => <Field field={field} f={f} />}
              />
            ))}
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" size="icon">
                  <PlusCircledIcon className="h-6 w-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="right" className="w-full">
                <PopoverClose>
                  <ToolBox appendFormFields={appendFormFields} />
                </PopoverClose>
              </PopoverContent>
            </Popover> */}
            <br />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AddForm;