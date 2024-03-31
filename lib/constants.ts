import { Features_list } from "./features";
import BbImage from "../app/images/bb.png";

export const TEXT = "text";
export const NUMBER = "number";
export const TEXTAREA = "textarea";
export const RICH_TEXT = "richtext";
export const FILE = "file";
export const PRODUCT_CARD = "product_card";
export const FAQ = "FAQ";
export const BLOG = "BLOG";
export const PRODUCT = "PRODUCT";
export const FEATURES = "FEATURES";
export const RATINGS = "RATINGS";
export const ARRAY_FEILD = "ARRAY_FEILD";
export const SELECT = "SELECT";
export const DATE = "DATE";
export const MULTI_SELECT = "MULTI_SELECT";
export const IMAGE = "IMAGE";

export const APPS: Iapps[] = [
  {
    id: "buyingBird",
    label: "Buying Bird",
    folder: "bb-admin",
    logo: BbImage,
  },
  {
    id: "geeksByNerd",
    label: "Geeks By Nerd",
    folder: "gbn-admin",
  },
];

const categoryOptions = [
  {
    value: "SMARTPHONE",
    label: "Smart Phones",
  },
  {
    value: "INNERWEAR",
    label: "Inner Wears",
  },
  {
    value: "GIFT",
    label: "Gift",
  },
  {
    value: "KITCHEN",
    label: "Kitchen Items",
  },
];

const RATINGS_PROPERTIES = [
  {
    type: "select",
    options: [
      { value: "AMAZON", label: "Amazon" },
      { value: "FLIPKART", label: "Flipkart" },
    ],
    name: "brand",
    label: "Brand",
    className: "w-[100px]",
    placeholder: "Enter...",
  },
  {
    type: "number",
    name: "rating",
    label: "Rating",
    className: "w-[100px]",
    placeholder: "Enter...",
  },

  {
    type: "number",
    name: "reviewCount",
    label: "Review Count",
    className: "w-[100px]",
    placeholder: "Enter...",
  },
];

const RATINGS_INITIALVALUE = {
  rating: 0,
  brand: "",
  reviewCount: 0,
};

const LINKS_PROPERTIES = [
  {
    type: "select",
    options: [
      { value: "AMAZON", label: "Amazon" },
      { value: "FLIPKART", label: "Flipkart" },
    ],
    name: "brand",
    label: "Brand",
    className: "w-[100px]",
    placeholder: "Select a Brand",
  },
  {
    type: "text",
    name: "link",
    label: "Link",
    className: "w-[400px]",
    placeholder: "https://...",
  },
];

const LINKS_INITIALVALUE = {
  link: "",
  brand: "",
};

export const EDITOR_TYPES = [
  {
    name: "Blog",
    value: BLOG,
  },
  {
    name: "Product",
    value: PRODUCT,
  },
];

export const EDITOR_FIELDS: EditorFields = {
  title: {
    name: "title",
    label: "Title",
    type: TEXT,
  },
  shortDescription: {
    name: "shortDescription",
    label: "Short Description",
    type: TEXTAREA,
  },
  image: {
    name: "image",
    label: "Cover Image URL",
    type: IMAGE,
  },
  category: {
    name: "category",
    label: "Category",
    type: SELECT,
    options: categoryOptions,
  },
  description: {
    name: "description",
    label: "Add Text Content",
    type: RICH_TEXT,
  },
  productCards: {
    name: "productCards",
    label: "Add Product",
    type: PRODUCT_CARD,
  },
  faq: {
    name: "faq",
    label: "Add FAQ",
    type: FAQ,
  },
  price: {
    name: "price",
    label: "₹ Price",
    type: NUMBER,
  },
  links: {
    name: "Links",
    label: "List Down The Links",
    type: ARRAY_FEILD,
    initialvalue: LINKS_INITIALVALUE,
    properties: LINKS_PROPERTIES,
  },
  features: {
    name: "features",
    label: "List Down The Features",
    type: FEATURES,
    // initialvalue: FEATURE_INITIALVALUE,
    properties: Features_list,
  },
  ratings: {
    name: "ratings",
    label: "Ratings",
    type: ARRAY_FEILD,
    initialvalue: RATINGS_INITIALVALUE,
    properties: RATINGS_PROPERTIES,
  },
  launchDate: {
    name: "launchDate",
    label: "Launch Date",
    type: DATE,
  },
  cons: {
    name: "cons",
    label: "Cons",
    type: ARRAY_FEILD,
  },
  standouts: {
    name: "standouts",
    label: "Standouts",
    type: ARRAY_FEILD,
  },
  highlights: {
    name: "highlights",
    label: "Highlights",
    type: ARRAY_FEILD,
  },
  tags: {
    name: "tags",
    label: "Tags",
    type: MULTI_SELECT,
  },
  priceCategory: {
    name: "priceCategory",
    label: "Price Category",
    type: TEXT,
  },
};

export const BLOG_EDITOR_FIELDS = [
  EDITOR_FIELDS["title"],
  EDITOR_FIELDS["shortDescription"],
  EDITOR_FIELDS["image"],
  EDITOR_FIELDS["description"],
  EDITOR_FIELDS["tags"],
];
export const PRODUCT_EDITOR_FIELDS = [
  EDITOR_FIELDS["title"],
  EDITOR_FIELDS["shortDescription"],
  EDITOR_FIELDS["category"],
  EDITOR_FIELDS["priceCategory"],
  EDITOR_FIELDS["image"],
  EDITOR_FIELDS["productCards"],
  EDITOR_FIELDS["tags"],
  EDITOR_FIELDS["faq"],
];

export const PRODUCT_FIELDS = [
  EDITOR_FIELDS["title"],
  { ...EDITOR_FIELDS["image"], label: "Image URL" },
  EDITOR_FIELDS["price"],
  EDITOR_FIELDS["launchDate"],
  EDITOR_FIELDS["category"],
  EDITOR_FIELDS["ratings"],
  EDITOR_FIELDS["standouts"],
  EDITOR_FIELDS["features"],
  EDITOR_FIELDS["cons"],
  EDITOR_FIELDS["highlights"],
  EDITOR_FIELDS["links"],
  EDITOR_FIELDS["shortDescription"],
];
