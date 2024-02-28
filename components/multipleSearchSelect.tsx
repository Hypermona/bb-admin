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

interface IMultipleSearchSelect {
  selected: string[];
  handleSelect: (s) => void;
  optionsPath: string;
  NoResult?: JSX.Element;
}

export default function MultipleSearchSelect({
  selected = [],
  optionsPath,
  handleSelect,
  NoResult,
}: Readonly<IMultipleSearchSelect>) {
  const [open, setOpen] = React.useState(false);
  const {
    data: options,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(
    `https://res.cloudinary.com/hypermona/raw/upload/bb-admin/${optionsPath}.json`,
    getData,
    { revalidateOnFocus: false, revalidateOnMount: false, revalidateIfStale: false }
  );
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
          <CommandInput placeholder="Search option..." />
          {NoResult ? NoResult : null}
          <LoadingButton disabled={isLoading || isValidating} onClick={() => mutate()}>
            <ResetIcon />
          </LoadingButton>
          <CommandEmpty>{"No option found."}</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="rounded-md border h-72">
              {options?.map((option: string) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    console.log(currentValue, selected, option);
                    let newSelected = [...selected];
                    if (selected.includes(currentValue)) {
                      newSelected = newSelected.filter((s) => s !== currentValue);
                    } else {
                      newSelected.push(currentValue);
                    }
                    handleSelect(newSelected);
                  }}
                >
                  <CheckCircledIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.includes(option?.toLocaleLowerCase()) ? "opacity-100" : "opacity-0"
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
