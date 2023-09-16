export const TEXT = "text"
export const NUMBER = "number"
export const TEXTAREA = "textarea"
export const RICH_TEXT = "richtext"
export const FILE = 'file'
export const PRODUCT_CARD = "product_card"
export const FAQ = "FAQ"
export const BLOG = "BLOG"
export const PRODUCT = "PRODUCT"
export const FEATURES = "FEATURES"
export const RATINGS = "RATINGS"
export const ARRAY_FEILD = "ARRAY_FEILD"

const FEATURE_PROPERTIES = [
  { type: "text", name: "name", label: "Name", className: "w-[300px]", placeholder: "Enter..." },
  {
    type: "text",
    name: "icon",
    label: "Icon URL",
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
];

const FEATURE_INITIALVALUE = {
  name: "",
  icon: "",
  rating: 0,
};

const RATINGS_PROPERTIES = [
  {
    type: "number",
    name: "rating",
    label: "Rating",
    className: "w-[100px]",
    placeholder: "Enter...",
  },
  {
    type: "select",
    options:[{value:"AMAZON",label:"Amazon"},{value:"FLIPKART",label:"Flipkart"}],
    name: "brand",
    label: "Brand",
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


export const EDITOR_TYPES = [
  {
    name:"Blog",
    value:BLOG
  },
  {
    name:"Product",
    value:PRODUCT
  }
]

export const EDITOR_FIELDS:EditorFields = {
  title:{
    name: "title",
    label: "Title",
    type: TEXT,
  },
  shortDescription :{
    name: "shortDescription",
    label: "Short Description",
    type: TEXTAREA,
  },
  image:{
    name: "image",
    label: "Cover Image URL",
    type: TEXT,
  },
  description :{
    name: "description",
    label: "Add Text Content",
    type: RICH_TEXT,
  },
  productCards:{
    name:"productCards",
    label:"Add Product",
    type:PRODUCT_CARD,
  },
  faq:{
    name:"faq",
    label:"Add FAQ",
    type:FAQ,
  },
  price:{
    name:"price",
    label:"₹ Price",
    type:NUMBER,
  },
  features:{
    name:"features",
    label:"List Down The Features",
    type:ARRAY_FEILD,
    initialvalue:FEATURE_INITIALVALUE,
    properties:FEATURE_PROPERTIES
  },
  ratings:{
    name:"ratings",
    label:"Ratings",
    type:ARRAY_FEILD,
    initialvalue:RATINGS_INITIALVALUE,
    properties:RATINGS_PROPERTIES
  }
}

export const BLOG_EDITOR_FIELDS = [
  EDITOR_FIELDS["title"],
  EDITOR_FIELDS["shortDescription"],
  EDITOR_FIELDS["image"],
  EDITOR_FIELDS["description"],
];
export const PRODUCT_EDITOR_FIELDS = [
  EDITOR_FIELDS["title"],
  EDITOR_FIELDS["shortDescription"],
  EDITOR_FIELDS["image"],
  EDITOR_FIELDS["productCards"],
  EDITOR_FIELDS["faq"]
];

export const PRODUCT_FIELDS = [
  EDITOR_FIELDS["title"],
  {...EDITOR_FIELDS["image"],label:"Image URL"},
  EDITOR_FIELDS["price"],
  EDITOR_FIELDS['ratings'],
  EDITOR_FIELDS['features'],
  EDITOR_FIELDS["shortDescription"],
]