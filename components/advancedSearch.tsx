import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: any;
};

function AdvancedSearch({ onSubmit }: Props) {
  const form = useForm();

  return (
    <div>
      <div className="flex w-full max-w-sm items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => <Input type="text" placeholder="Title" {...field} />}
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
