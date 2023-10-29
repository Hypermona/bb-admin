import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { rm } from "fs";
import { getSlutJsonfilename, storeFile } from "@/lib/helpers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
  if (req.body) {
    const body = await req.json();
    console.log("client", body);
    const filename = getSlutJsonfilename(body?.data?.title);
    await storeFile(path.join("db", filename), body?.data);
    const res = await cloudinary.uploader.upload(path.join("db", filename), {
      ...(!body?.metaData?.public_id ? { folder: "bb-admin/blogs" } : {}),
      resource_type: "raw",
      public_id: body?.metaData?.public_id,
      overwrite: !!body?.metaData?.public_id,
      invalidate: !!body?.metaData?.public_id,
    });
    if (res) {
      rm(path.join("db", filename), (err) => {
        console.log(err);
      });
    }
    return new Response(JSON.stringify({}), {
      status: 200,
    });
  }
}
export async function GET() {
  let posts = Array;
  return cloudinary.search
    .expression(
      "folder:bb-admin/blogs/*" // add your folder
    )
    .sort_by("public_id", "desc")
    .max_results(10)
    .execute()
    .then((result) => {
      console.log(typeof result?.resources);
      posts = result?.resources;
      return new Response(JSON.stringify(posts), {
        status: 200,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
