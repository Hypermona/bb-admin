import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { rm } from "fs";
import { getSlug, getSlugJsonfilename, storeFile } from "@/lib/helpers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
  if (req.body) {
    const body = await req.json();
    const filename = "feature__" + body?.data?.filename + ".json";
    const slugValue = getSlug(body?.data?.value);
    const fetchURL =
      "https://res.cloudinary.com/" +
      process.env.CLOUDINARY_CLOUD_NAME +
      "/raw/upload/" +
      "bb-admin/features/" +
      filename;
    let newFeature: any = null;
    try {
      let prev = await (await fetch(fetchURL)).json();
      console.log("prev", typeof prev);
      if (prev?.length) {
        newFeature = [...prev, { value: slugValue, label: body?.data?.value }];
      }
    } catch (err) {
      console.log(err);
      newFeature = [{ value: slugValue, label: body?.data?.value }];
    }
    console.log("final", newFeature);
    await storeFile(path.join("db", filename), newFeature);
    const res = await cloudinary.uploader.upload(path.join("db", filename), {
      folder: "bb-admin/features/",
      public_id: filename,
      resource_type: "raw",
      overwrite: true,
      invalidate: true,
    });
    rm(path.join("db", filename), (err) => {
      console.log(err);
    });
    return new Response(JSON.stringify(res), {
      status: 200,
    });
  }
}
