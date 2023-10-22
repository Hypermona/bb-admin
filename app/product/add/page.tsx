"use client";
import Field from "@/components/FormComponents/Field";
import UploadImages from "@/components/UploadImages";
import Header from "@/components/product/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { ARRAY_FEILD, PRODUCT_FIELDS } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {};

function AddProduct() {
  const submitRef = useRef<HTMLInputElement>(null);
  const query = useSearchParams();
  const state = JSON.parse(query.get("data")!);
  const form = useForm({ defaultValues: JSON.parse(query.get("data")!) });
  console.log(query.get("selected"));

  const action = useMemo(
    () => (
      <>
        <UploadImages />
        <Button
          onClick={() => {
            submitRef.current?.click();
          }}
        >
          {!!state ? "Update" : "Submit"}
        </Button>
      </>
    ),
    [state]
  );
  const onSubmit = async (data) => {
    let payload = !!state
      ? { id: state?.id, data: data }
      : { data: { ...data, search: data.title.toLocaleLowerCase() } };
    await fetch("/api/product/add", {
      method: !!state ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };
  return (
    <div className="scroll-smooth">
      <Header title="Add Product" Action={action} />
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
