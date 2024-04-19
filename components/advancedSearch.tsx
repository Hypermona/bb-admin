import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form, FormField } from "@/components/ui/form";

import { useForm } from "react-hook-form";

type Props = {
  onSubmit: any;
  onPriceSearch: any;
};

function AdvancedSearch({ onSubmit, onPriceSearch }: Readonly<Props>) {
  const form = useForm();

  return (
    <div>
      <div className="flex items-center">
        PriceBy
        <Input
          type="text"
          placeholder="Enter price"
          onChange={(e) => onPriceSearch(e.target.value)}
          className="w-50 inline-block mr-5"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <Input type="text" placeholder="Title" className="w-50 inline-block" {...field} />
              )}
            />
            <Button type="submit" variant={"secondary"}>
              Search
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AdvancedSearch;
