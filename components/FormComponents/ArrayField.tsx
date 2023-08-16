import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {  useFieldArray, useFormContext } from "react-hook-form";
import { TrashIcon } from "@radix-ui/react-icons";

type Props = {
  fieldName: string;
  properties: {
    type?: string;
    name: string;
    label: string;
    className: string;
    placeholder?: string;
  }[];
  initialValues: object;
  onSubmit: (v) => void;
};

function ArrayField({ fieldName, initialValues, properties, onSubmit}: Props) {
  const form = useFormContext();
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <>
      {fields.map((_field, index) => (
        <div key={_field.id} className="flex w-full items-center space-x-2">
          {properties.map((prop, i) => (
            <FormField
              key={_field.id + i}
              control={control}
              name={`${fieldName}.${index}.${prop.name}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{prop.label}</FormLabel>
                  <FormControl>
                    <Input
                      type={prop.type}
                      {...field}
                      className={prop.className}
                      placeholder={prop.placeholder}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          ))}
          <Button
            type="button"
            className="mt-8"
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
        className="p-5 mx-2"
        onClick={() => append(initialValues)}
      >
        Add
      </Button>
    </>
  );
}

export default ArrayField;
