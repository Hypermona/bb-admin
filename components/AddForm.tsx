"use Client";
import React, { useEffect, useId, useState } from "react";
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
import { useForm, FormProvider} from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverClose, PopoverTrigger } from "@radix-ui/react-popover";
import ToolBox from "./ToolBox";
import Field from "./FormComponents/Field";
import { BLOG, BLOG_EDITOR_FIELDS, EDITOR_FIELDS, PRODUCT_EDITOR_FIELDS } from "@/lib/constants";
import Content from "@/context/content";

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

// type FormFieldMain =
//   | {
//       title: string;
//       sortDescription: string;
//       image: string;
//     }
//   | { description: string; faq: string }
//   | {
//       productCard: {
//         title: string;
//         image: string;
//         price: string;
//         features: {
//           name: string;
//           icon: string;
//           rating: string;
//         };
//         sortDescription: string;
//       };
//       faq: string;
//     };

function AddForm() {
  const {content:{type}}=Content.useContainer()
  const formFields= type=== BLOG ?BLOG_EDITOR_FIELDS:PRODUCT_EDITOR_FIELDS
  const form = useForm();
  const onSubmit = (d: any) => {
    console.log(d);
  };
  return (
    <Card className="w-[785px]">
      <CardHeader>
        <CardTitle>Add Content</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {formFields.map((f: FormField, i: number) => (
              <FormField
                key={f.name}
                control={form.control}
                name={f.name}
                render={({ field }) => <Field field={field} f={f} />}
              />
            ))}
            <br />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}

export default AddForm;
