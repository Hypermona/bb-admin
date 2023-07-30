export const TEXT = "text"
export const TEXTAREA = "textarea"
export const RICH_TEXT = "richtext"
export const FILE = 'file'
export const PRODUCT_CARD = "product_card"
export const FAQ = "FAQ"

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
  coverImage:{
    name: "image",
    label: "Select an Cover Image",
    type: TEXT,
  },
  textBlock :{
    name: "textBlock",
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
  }
}

export const BLOG_EDITOR_FIELDS = [
  EDITOR_FIELDS["title"],
  EDITOR_FIELDS["shortDescription"],
  EDITOR_FIELDS["coverImage"],
  EDITOR_FIELDS["textBlock"],
  EDITOR_FIELDS["faq"]
];
export const PRODUCT_EDITOR_FIELDS = [
  EDITOR_FIELDS["title"],
  EDITOR_FIELDS["shortDescription"],
  EDITOR_FIELDS["coverImage"],
  EDITOR_FIELDS["productCard"],
  EDITOR_FIELDS["faq"]
];

