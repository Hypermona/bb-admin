"use client";
import Field from "@/components/FormComponents/Field";
import LoadingButton from "@/components/LoadingButton";
import UploadImages from "@/components/UploadImages";
import Header from "@/components/product/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { ARRAY_FEILD, PRODUCT_FIELDS } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {};

function AddProduct() {
  const submitRef = useRef<HTMLInputElement>(null);
  const query = useSearchParams();
  const [loading, setLoading] = useState(false);
  const state = JSON.parse(query.get("data")!);
  const isCopy = JSON.parse(query.get("copy")!);
  const form = useForm({ defaultValues: JSON.parse(query.get("data")!) });
  console.log(query.get("selected"));
  const router = useRouter();

  const action = useMemo(
    () => (
      <>
        <UploadImages />
        <LoadingButton
          disabled={loading}
          onClick={() => {
            submitRef.current?.click();
          }}
        >
          {!!state && !isCopy ? "Update" : "Submit"}
        </LoadingButton>
      </>
    ),
    [state, loading, isCopy]
  );
  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    let payload =
      !!state && !isCopy
        ? { id: state?.id, data: data }
        : { data: { ...data, id: null, search: data.title.toLocaleLowerCase() } };
    const res = await fetch("/api/product/add", {
      method: !!state && !isCopy ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (res.status === 200) {
      router.replace("/product");
    }
    setLoading(false);
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
