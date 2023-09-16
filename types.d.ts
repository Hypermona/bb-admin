type FormField = {
  name: string;
  label?: string;
  type: string;
  placeholder?:string;
  initialvalue?:any;
  properties?:any;
};

type ProductFields = {
  title: string;
  image: string;
  price: string;
  ratings: { rating: number; brand:string; reviewCount: number }[];
  features: { name: string; icon: string; rating: number }[];
  shortDescription: string;
}

type MainFormValues =
  | {
      title: string;
      shortDescription: string;
      image: string;
    }
  | {
      description: string;
      faq: string;
    }
  | {
      productCards: {
        title: string;
        image: string;
        price: string;
        ratings: { rating: number; brand:string; reviewCount: number }[];
        features: { name: string; icon: string; rating: number }[];
        shortDescription: string;
      }[];
      faq: string;
    };

type EditorFields = {
  title:FormField,
  shortDescription:FormField,
  image:FormField,
  description:FormField,
  productCards:FormField,
  faq:FormField,
  price:FormField,
  ratings:FormField,
  features:FormField
}