import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TrashIcon } from "@radix-ui/react-icons";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  fieldName: string;
  properties: {
    type?: string;
    name: string;
    label: string;
    className: string;
    placeholder?: string;
    options?: {
      value: string;
      label: string;
    }[];
  }[];
  initialValues: object;
  onSubmit: (v) => void;
};

function ArrayField({ fieldName, initialValues, properties, onSubmit }: Props) {
  const form = useFormContext();
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <Card className="p-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex w-full items-center space-x-2 my-1">
          {properties ? (
            properties.map((prop, i) => (
              <FormField
                key={field.id}
                control={control}
                name={`${fieldName}.${index}.${prop.name}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{prop.label}</FormLabel>
                    <FormControl>
                      {prop?.type === "select" ? (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder={prop?.placeholder} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {prop?.options?.map((o) => (
                                <SelectItem value={o.value} key={o.value}>
                                  {o.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type={prop.type}
                          {...field}
                          className={prop.className}
                          placeholder={prop.placeholder}
                        />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            ))
          ) : (
            <FormField
              key={field.id}
              control={control}
              name={`${fieldName}.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type={"text"} {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          )}
          <Button
            type="button"
            className={!!properties ? "mt-8" : ""}
            variant={"destructive"}
            onClick={() => remove(index)}
          >
            <TrashIcon />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant={"secondary"}
        className="p-5 m-2"
        onClick={() => append(initialValues)}
      >
        Add
      </Button>
    </Card>
  );
}

export default ArrayField;
