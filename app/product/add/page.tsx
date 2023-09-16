"use client";
import Field from "@/components/FormComponents/Field";
import Header from "@/components/product/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { ARRAY_FEILD, PRODUCT_FIELDS } from "@/lib/constants";
import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {};

function AddProduct({}: Props) {
  const submitRef = useRef<HTMLInputElement>(null);
  const form = useForm();
  const action = {
    label: "Submit",
    onClick: () => submitRef.current?.click(),
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="scroll-smooth">
      <Header title="Add Product" action={action} />
      <Card className="w-[800px] m-auto p-5 mt-5">
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {PRODUCT_FIELDS.map((f: FormField, i: number) =>
                f.type === ARRAY_FEILD ? (
                  <Field key={f.name} f={f} />
                ) : (
                  <FormField
                    key={f.name}
                    control={form.control}
                    name={f.name}
                    render={({ field }) => <Field field={field} f={f} />}
                  />
                )
              )}
              <input type="submit" hidden={true} ref={submitRef} />
            </form>
          </Form>
        </FormProvider>
      </Card>
    </div>
  );
}

export default AddProduct;
