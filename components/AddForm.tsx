"use Client";
import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Field from "./FormComponents/Field";
import { BLOG, BLOG_EDITOR_FIELDS, FEATURES, PRODUCT_EDITOR_FIELDS } from "@/lib/constants";
import Content from "@/context/content";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { getData } from "@/lib/dataservices";
import { useEffect, useState } from "react";
import LoadingButton from "./LoadingButton";

function AddForm() {
  const {
    content: { type, appDetails },
    changeContentType,
  } = Content.useContainer();
  const router = useRouter();
  const query = useSearchParams();
  const selected = JSON.parse(query.get("selected")!);
  const fetch_url = query.get("fetch_url");
  const metaState = JSON.parse(query.get("metaData")!);
  const isCopy = JSON.parse(query.get("copy")!);
  const _type = query.get("type")!;
  const { data } = useSWR(fetch_url, getData);
  const [submiting, setSubmiting] = useState(false);
  console.log(data);
  useEffect(() => {
    if (!!data?.type) {
      changeContentType(data?.type);
    }
    if (!!_type) {
      changeContentType(_type);
    }
  }, [data?.type, _type]);

  const formFields = type === BLOG ? BLOG_EDITOR_FIELDS : PRODUCT_EDITOR_FIELDS;

  const form = useForm<BlogOrProductCards>({
    defaultValues: { ...data, productCards: data?.productCards || selected },
  });

  console.log("type", type, "__type", _type);
  const onSubmit = async (data: any) => {
    setSubmiting(true);
    console.log(data);
    try {
      let res = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { ...data, type },
          metaData: metaState,
          isCopy,
          folder: appDetails.folder,
        }),
      });
      if (res.status === 200) {
        router.replace("/home");
      }
    } catch (err) {
      console.log(err);
    }
    setSubmiting(false);
  };
  return (
    <Card className="w-[785px]">
      <CardHeader>
        <CardTitle>
          <p className="text-slate-300 tracking-tight font-bold text-3xl">
            Add Content for {appDetails?.label}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {formFields.map((f: FormField, i: number) =>
              f.type === FEATURES ? (
                <Field key={f.name} f={f} />
              ) : (
                <FormField
                  key={f.name}
                  control={form.control}
                  name={f.name as any}
                  render={({ field }) => <Field field={field} f={f} />}
                />
              )
            )}
            <LoadingButton type="submit" disabled={submiting}>
              Submit
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AddForm;
