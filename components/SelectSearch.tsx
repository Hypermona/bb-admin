"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CaretSortIcon, CheckCircledIcon, ResetIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "./ui/scroll-area";
import AddFeature from "./addFeature";
import { getSlug } from "@/lib/helpers";
import { getData } from "@/lib/dataservices";

type TSelect = {
  value: string;
  label: string;
};

interface ISelectSearch {
  selected: TSelect;
  handleSelect: (TSelect) => void;
  // options: TSelect[];
  NoResult?: {
    filename: string;
    apiPath: string;
  };
  // mutate?: any;
}

export default function SelectSearch({
  selected,
  // options,
  handleSelect, // NoResult,
} // mutate,
: Readonly<ISelectSearch>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [options, setOptions] = React.useState<TSelect[]>([]);
  const loadOptions = async () => {
    let options = await getData(
      `https://res.cloudinary.com/hypermona/raw/upload/bb-admin/features/feature__processors.json`
    );
    setOptions(Array.from(new Set(options?.filter((e) => e))));
  };
  React.useEffect(() => {
    loadOptions();
  }, []);

  const onSelect = (option: TSelect, open) => {
    console.log(option, options);
    if (option.value !== selected?.value) {
      handleSelect(option);
    }
    setOpen(open);
  };

  const onAddSuccess = () => {
    let selected = { value: getSlug(value), label: value };
    setOptions((prev) => [selected, ...prev]);
    console.log(selected, options);
    onSelect(selected, true);
    setValue("");
  };

  console.log("op", options);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" aria-expanded={open} className="w-[100%] justify-between">
          {selected?.value
            ? options?.find((option) => option.value === selected.value)?.label
            : "Select option..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100%] p-0">
        <Command>
          <CommandInput
            placeholder="Search option..."
            value={value}
            onValueChange={(search) => setValue(search)}
          />
          <CommandEmpty>
            <AddFeature value={value} onAddSuccess={onAddSuccess} />
            <p>{"No option found."}</p>
          </CommandEmpty>
          <CommandGroup>
            <ScrollArea className="rounded-md border h-72">
              {options?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => onSelect(option, false)}
                >
                  <CheckCircledIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
