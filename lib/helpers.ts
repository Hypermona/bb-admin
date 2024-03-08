import { writeFile } from "fs";
import slugify from "slugify";

export const currencyFormatter = (value) => {
  let price: number = Number.isInteger(value) ? Number.parseInt(value) : Number.parseFloat(value);
  return price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
};

export const storeFile = async (path: string, data: object) => {
  writeFile(path, JSON.stringify(data), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const getSlug = (str: string) => {
  return slugify(str, { lower: true, strict: true, trim: true });
};
export const getSlugJsonfilename = (str: string) => {
  return `${getSlug(str)}.json`;
};

export const getFileName = (url: string, removeURL: string) => {
  return url?.split(".")[0].replace(removeURL, "");
};
