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
  productCard:{
    name:"productCard",
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
    type:FEATURES,
  },
  ratings:{
    name:"ratings",
    label:"Ratings",
    type:RATINGS,
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
  EDITOR_FIELDS["productCard"],
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