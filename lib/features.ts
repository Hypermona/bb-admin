export enum CATEGORIES {
  SMARTPHONE = "SMARTPHONE",
  INNERWEAR = "INNERWEAR",
  GIFT = "GIFT",
  KITCHEN = "KITCHEN",
}

const processorOptions = [
  {
    value: "dimensity-7400",
    label: "Dimensity 7400",
  },
];

export const Features_list = [
  {
    name: "display",
    label: "Display",
    type: "text",
    placeholder: "Enter...",
    category: CATEGORIES.SMARTPHONE,
  },
  {
    name: "network",
    label: "Network",
    type: "text",
    placeholder: "Enter...",
    category: CATEGORIES.SMARTPHONE,
  },
  {
    name: "chip",
    label: "Processor",
    type: "select",
    options: processorOptions,
    placeholder: "Enter...",
    category: CATEGORIES.SMARTPHONE,
  },
  {
    name: "camera",
    label: "Camera",
    type: "text",
    placeholder: "Enter...",
    category: CATEGORIES.SMARTPHONE,
  },
  {
    name: "battery",
    label: "Battery",
    type: "text",
    placeholder: "Enter...",
    category: CATEGORIES.SMARTPHONE,
  },
  {
    name: "charger",
    label: "Charger",
    type: "text",
    placeholder: "Enter...",
    category: CATEGORIES.SMARTPHONE,
  },
  {
    name: "connectivity",
    label: "Connectivity",
    type: "text",
    placeholder: "Enter...",
    category: CATEGORIES.SMARTPHONE,
  },
  {
    name: "os",
    label: "OS",
    type: "text",
    placeholder: "Enter...",
    category: CATEGORIES.SMARTPHONE,
  },
  {
    name: "standBy",
    label: "Stand By Time",
    type: "text",
    placeholder: "Enter...",
    category: CATEGORIES.SMARTPHONE,
  },
];
