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
import useSWR from "swr";
import { getData } from "@/lib/dataservices";
import { ScrollArea } from "./ui/scroll-area";
import LoadingButton from "./LoadingButton";
import AddFeature from "./addFeature";

interface IMultipleSearchSelect {
  selected: string[];
  handleSelect: (s) => void;
  optionsPath: string;
  NoResult?: { filename: string; apiPath: string };
}

export default function MultipleSearchSelect({
  selected = [],
  optionsPath,
  handleSelect,
  NoResult,
}: Readonly<IMultipleSearchSelect>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [options, setOptions] = React.useState<string[]>([]);
  const loadOptions = async () => {
    let options = await getData(
      `https://res.cloudinary.com/hypermona/raw/upload/bb-admin/${optionsPath}.json`
    );
    setOptions(Array.from(new Set(options?.filter((e) => e))));
  };
  React.useEffect(() => {
    loadOptions();
  }, []);
  console.log("op", options);

  const onSelect = (currentValue) => {
    console.log(currentValue, selected);
    let newSelected = [...selected];
    if (selected.includes(currentValue)) {
      newSelected = newSelected.filter((s) => s !== currentValue);
    } else {
      newSelected.push(currentValue);
    }
    handleSelect(newSelected);
  };

  const onAddSuccess = () => {
    setOptions((prev) => [value, ...prev]);
    onSelect(value);
    setValue("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" aria-expanded={open} className="min-w-[200px] justify-between">
          {selected?.length
            ? selected.reduce(
                (prev, curr, currI) => prev + curr + (currI + 1 !== selected.length ? ", " : ""),
                ""
              )
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
            <p>{"No option found."}</p>
          </CommandEmpty>
          {value && !options.includes(value) && (
            <AddFeature {...NoResult} value={value} onAddSuccess={onAddSuccess} />
          )}
          <CommandGroup>
            <ScrollArea className="rounded-md border h-72">
              {options.length > 0 &&
                options.map((option: string) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={(currentValue) => onSelect(currentValue)}
                  >
                    <CheckCircledIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected?.includes(option?.toLocaleLowerCase())
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option}
                  </CommandItem>
                ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
