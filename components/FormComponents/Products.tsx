import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FEATURES, FILE, PRODUCT_FIELDS, RATINGS, RICH_TEXT, TEXTAREA } from "@/lib/constants";
import { Textarea } from "../ui/textarea";
import RichEditor from "../Editor/RichEditor";
import ArrayField from "./ArrayField";

const AddProductDialog = ({ isOpen, control, onToggle, field, index, OnSubmit }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => onToggle(open)}>
      <DialogContent className="sm:max-w-[800px] h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click Done button when youre done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={() => onToggle(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type Props = {};

function Products({}: Props) {
  const form = useFormContext();
  const { control, watch } = form;
  const { fields, append, remove } = useFieldArray({
    name: "productCards",
    control,
    rules: { maxLength: 4 },
  });
  const [open, toggleOpen] = useState(false);
  const onToggle = (open) => toggleOpen(open);
  const addNewProduct = () => {
    append({
      title: "",
      image: "",
      price: 0,
      shortDescription: "",
    });
    console.log("add colled", fields);
  };
  const removeProduct = (id) => {
    remove(id);
    console.log("rmoved", id, fields);
  };
  return (
    <Card>
      <CardContent>
        {fields?.map((field, i) => (
          <Card key={field.id}>
            <CardContent className="flex">
              {/* <p>{watch("productCards."+i+".title")}</p> */}
              <Button
                variant={"outline"}
                type="button"
                className="mt-3"
                onClick={() => onToggle(true)}
              >
                <Pencil2Icon className="w-4 h-4" />
                <span className="p-2">Edit</span>
              </Button>
              <Button
                variant={"destructive"}
                type="button"
                className="mt-3"
                onClick={() => removeProduct(i)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
              <AddProductDialog
                field={field}
                control={control}
                index={i}
                isOpen={open}
                onToggle={onToggle}
                OnSubmit={() => {}}
              />
            </CardContent>
          </Card>
        ))}
        <Button variant={"secondary"} type="button" className="mt-3" onClick={addNewProduct}>
          <Pencil2Icon className="w-4 h-4" />
          <span className="p-2">Add Product</span>
        </Button>
      </CardContent>
    </Card>
  );
}

export default Products;
