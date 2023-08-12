import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form";
import { FEATURES, FILE, PRODUCT_FIELDS, RATINGS, RICH_TEXT, TEXTAREA } from "@/lib/constants";
import { Textarea } from "../ui/textarea";
import RichEditor from "../Editor/RichEditor";
import ArrayField from "./ArrayField";

const featureProperties = [
  { type: "text", name: "name", label: "Name", className: "w-[300px]", placeholder: "Enter..." },
  {
    type: "text",
    name: "icon",
    label: "Icon URL",
    className: "w-[100px]",
    placeholder: "Enter...",
  },
  {
    type: "number",
    name: "rating",
    label: "Rating",
    className: "w-[100px]",
    placeholder: "Enter...",
  },
];

const featureInitialValue = {
  name: "",
  icon: "",
  rating: 0,
};

const ratingsProperties = [
  {
    type: "number",
    name: "rating",
    label: "Rating",
    className: "w-[100px]",
    placeholder: "Enter...",
  },
  {
    type: "text",
    name: "brand",
    label: "Brand",
    className: "w-[100px]",
    placeholder: "Enter...",
  },
  {
    type: "number",
    name: "reviewCount",
    label: "Review Count",
    className: "w-[100px]",
    placeholder: "Enter...",
  },
];

const ratingsInitialValue = {
  rating: 0,
  brand: "",
  reviewCount: 0,
};

const RenderFieldByType = ({ field, f }) => {
  switch (f.type) {
    case TEXTAREA:
      return <Textarea {...field} />;
    case FILE:
      return <Input type={f.type} onChange={(e) => field.onChange(e.target.files)} />;
    case RICH_TEXT:
      return <RichEditor onChange={(v) => field.onChange(v)} />;
    case RATINGS:
      return (
        <ArrayField
          fieldName="ratings"
          properties={ratingsProperties}
          initialValues={ratingsInitialValue}
          onSubmit={(v) => field.onChange(v)}
        />
      );
    case FEATURES:
      return (
        <ArrayField
          fieldName="features"
          properties={featureProperties}
          initialValues={featureInitialValue}
          onSubmit={(v) => field.onChange(v)}
        />
      );
    default:
      return <Input type={f.type} placeholder="shadcn" {...field} />;
      break;
  }
};

function Field(props) {
  return (
    <FormItem>
      <FormLabel>{props.f.label}</FormLabel>
      <FormControl>
        <RenderFieldByType {...props} />
      </FormControl>
    </FormItem>
  );
}

const AllProducts = ({ products }) => {
  if (products) {
    return <p>hi</p>;
  } else {
    return null;
  }
};

const AddProductDialog = ({ isOpen, onToggle, OnSubmit }) => {
  const form = useFormContext();
  return (
    <Dialog open={isOpen} onOpenChange={(open) => onToggle(open)}>
      <DialogContent className="sm:max-w-[800px] h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          {PRODUCT_FIELDS.map((f: FormField, i: number) => (
            <FormField
              key={f.name + "_" + i}
              control={form.control}
              name={`products.${i}.${f.name}`}
              render={({ field }) => <Field field={field} f={f} />}
            />
          ))}
          <DialogFooter>
            <Button type="button" onClick={() => onToggle(false)}>
              Done
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

type Props = {};

function Products({}: Props) {
  const [products, setProducts] = useState({
    products:[
      {
        title:"",
        image:"",
        price:0,
        shortDescription:""
      }
    ]
  });
  const [open, toggleOpen] = useState(false);
  const onToggle = (open) => toggleOpen(open);
  return (
    <Card>
      <CardContent>
        <AllProducts products={""} />
        {products.products.map((prod, i) => (
          <Card key={i}>
            <CardContent className="flex">
              <p className="flex-1">{prod.title}o</p>
              <Button
                variant={"secondary"}
                type="button"
                className="mt-3"
                onClick={() => onToggle(true)}
              >
                <Pencil2Icon className="w-4 h-4" />
                <span className="p-2">Edit Product</span>
              </Button>
              <AddProductDialog isOpen={open} onToggle={onToggle} OnSubmit={() => {}} />
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

export default Products;
