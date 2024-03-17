import React from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { ControllerRenderProps } from "react-hook-form";

const isValidImageUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes("cloudinary.com")) {
      return false;
    }
    const baseUrl = parsedUrl.origin + parsedUrl.pathname;
    const regex = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
    return regex.test(baseUrl);
  } catch (error) {
    console.error("Error parsing URL:", error);
    return false;
  }
};

type Props = {
  field?: ControllerRenderProps<BlogOrProductCards, any>;
};

const ImageUrlUpload = ({ field }: Props) => {
  const onChange = (e) => {
    let url = e.target.value;
    console.log("URL, before convert", url);

    if (isValidImageUrl(url)) {
      url = url.split("?")[0];
      const formData = new FormData();
      formData.append("file", url);
      formData.append("folder", "bb-admin/images");
      formData.append("upload_preset", "" + "u5yrn1d9-bb-poc");
      axios
        .post("https://api.cloudinary.com/v1_1/hypermona/image/upload/", formData)
        .then((data) => {
          url = data?.data?.secure_url;
          field?.onChange(url);
          console.log("URL, after convert", url);
          toast({
            description: (
              <p className="text-green-600">Coneverted Image into Cloudinary Image...</p>
            ),
          });
        });
    } else {
      field?.onChange(url);
    }
  };
  return <Input type={"url"} placeholder="https://image....." {...field} onChange={onChange} />;
};

export default ImageUrlUpload;
