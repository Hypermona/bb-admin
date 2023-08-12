type FormField = {
  name: string;
  label?: string;
  type: string;
};

type EditorFields = {
  title:FormField,
  shortDescription:FormField,
  image:FormField,
  description:FormField,
  productCard:FormField,
  faq:FormField,
  price:FormField,
  ratings:FormField,
  features:FormField
}