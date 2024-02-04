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
import { CaretSortIcon, CheckCircledIcon } from "@radix-ui/react-icons";

type TSelect = {
  value: string;
  label: string;
};

interface ISelectSearch {
  selected: TSelect;
  handleSelect: (TSelect) => void;
  options: TSelect[];
  NoResult?: React.FC;
}

export default function SelectSearch({
  selected,
  options,
  handleSelect,
  NoResult,
}: Readonly<ISelectSearch>) {
  const [open, setOpen] = React.useState(false);
  console.log("op", options);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" aria-expanded={open} className="w-[200px] justify-between">
          {selected?.value
            ? options?.find((option) => option.value === selected.value)?.label
            : "Select option..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search option..." />
          {NoResult ? <NoResult /> : null}
          <CommandEmpty>{"No option found."}</CommandEmpty>
          <CommandGroup>
            {options?.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  console.log(currentValue, selected);
                  if (currentValue !== selected?.value) {
                    handleSelect(options?.find((o) => o.value === currentValue));
                  }
                  setOpen(false);
                }}
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
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
