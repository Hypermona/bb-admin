import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import set from 'lodash.set'
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
import { useForm, useFieldArray } from "react-hook-form";
import { TrashIcon } from "@radix-ui/react-icons";

type Props = {
  fieldName: string;
  properties: {
    type?:string;
    name:string;
    label:string;
    className:string;
    placeholder?:string;
  }[];
  initialValues: object;
  onSubmit: (v) => void;
};

type FormValues = {
  feature: {
    name: string;
    icon: string;
    rating: number;
  }[];
};

function ArrayField({fieldName,initialValues,properties,onSubmit}: Props) {
  let [field, setField] = useState({
    [fieldName]: [{...initialValues}],
  });
  const append=()=>{
    setField((prev)=>({[fieldName]:[...prev[fieldName],{...initialValues}]}))
  }
  const remove = (index)=>{
    let filterdFeatures = [...field[fieldName]].filter((f,i)=>i!==index);
    setField({[fieldName]:filterdFeatures})
  }
  const handleOnchange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    let tempValues = {...field};
    set(tempValues,name,value);
    setField(tempValues);
  }
  return (
    <>
      {field[fieldName].map((item, index) => (
        <div key={index} className="flex w-full items-center space-x-2">
          {properties.map((prop, i) => (
            <FormItem key={fieldName + prop.name + i}>
              <FormLabel>{prop.label}</FormLabel>
              <FormControl>
                <Input
                  type={prop.type}
                  name={`${fieldName}.${index}.${prop.name}`}
                  value={field[fieldName][index][prop.name]}
                  onChange={handleOnchange}
                  className={prop.className}
                  placeholder={prop.placeholder}
                />
              </FormControl>
            </FormItem>
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
      <Button type="button" variant={"secondary"} className="p-5 mx-2" onClick={() => append()}>
        Add
      </Button>
      <Button
        type="button"
        onClick={() => {
          onSubmit(field)
        }}
      >
        Submit
      </Button>
    </>
  );
}

export default ArrayField;
