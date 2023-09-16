"use Client";
import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Field from "./FormComponents/Field";
import { BLOG, BLOG_EDITOR_FIELDS, PRODUCT_EDITOR_FIELDS } from "@/lib/constants";
import Content from "@/context/content";

function AddForm() {
  const {
    content: { type },
  } = Content.useContainer();
  const formFields = type === BLOG ? BLOG_EDITOR_FIELDS : PRODUCT_EDITOR_FIELDS;
  const form = useForm({});
  const onSubmit = (d: any) => {
    console.log(d);
  };
  return (
    <Card className="w-[785px]">
      <CardHeader>
        <CardTitle>Add Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {formFields.map((f: FormField, i: number) => (
              <FormField
                key={f.name}
                control={form.control}
                name={f.name as any}
                render={({ field }) => <Field field={field} f={f} />}
              />
            ))}
            <br />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AddForm;
