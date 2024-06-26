type FormField = {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  initialvalue?: any;
  properties?: any;
  options?: { value: string; label: string }[];
};

interface ProductFields {
  title: string;
  image: string;
  price: string;
  launchDate: string;
  category: string;
  ratings: { rating: number; brand: string; reviewCount: number }[];
  standouts: string[];
  features: Object;
  cons: string[];
  highlights: string[];
  links: { link: string; brand: string }[];
  shortDescription: string;
}
interface resProductFields extends ProductFields {
  id: string;
}

type actionType = {
  selected: resProductFields[];
  onSubmit?: Function;
  clearSelected?: Function;
};

type BlogOrProductCards =
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
      productCards: ProductFields[];
      faq: string;
    };

type EditorFields = {
  title: FormField;
  shortDescription: FormField;
  image: FormField;
  description: FormField;
  productCards: FormField;
  faq: FormField;
  price: FormField;
  ratings: FormField;
  features: FormField;
  category: FormField;
  links: FormField;
  launchDate: FormField;
  cons: FormField;
  standouts: FormField;
  highlights: FormField;
  tags: FormField;
  priceCategory: FormField;
};

interface WishList {
  id: string;
  name: string;
  products: string[];
}
interface Iapps {
  id: string;
  label: string;
  logo?: StaticImageData;
  folder: string;
  env: "PROD" | "DEV";
}
