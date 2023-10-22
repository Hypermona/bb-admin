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

            {/* <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">Ratings</SelectItem>
                      <SelectItem value="m@google.com">price</SelectItem>
                      <SelectItem value="m@support.com">m@support.com</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            /> */}
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
