import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { rm } from "fs";
import { storeFile } from "@/lib/helpers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
  if (req.body) {
    const body = await req.json();
    const filename = body?.data?.filename + ".json";
    const fetchURL =
      "https://res.cloudinary.com/" +
      process.env.CLOUDINARY_CLOUD_NAME +
      "/raw/upload/" +
      "bb-admin/tags/" +
      filename;
    let newFeature: any = null;
    try {
      let prev = await (await fetch(fetchURL)).json();
      if (prev?.length) {
        newFeature = [...prev, body?.data?.value];
      }
    } catch (err) {
      newFeature = [body?.data?.value];
    }
    await storeFile(filename, newFeature);
    const res = await cloudinary.uploader.upload(filename, {
      folder: "bb-admin/tags/",
      public_id: filename,
      resource_type: "raw",
      overwrite: true,
      invalidate: true,
    });
    rm(filename, (err) => {
      console.log(err);
    });
    return new Response(JSON.stringify(res), {
      status: 200,
    });
  }
}
