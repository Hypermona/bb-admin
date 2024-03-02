import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { rm } from "fs";
import { getSlugJsonfilename, storeFile } from "@/lib/helpers";

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
    const filename = getSlugJsonfilename(body?.data?.title);
    await storeFile(filename, body?.data);
    const res = await cloudinary.uploader.upload(filename, {
      ...(body?.isCopy || !body?.metaData?.public_id
        ? { folder: "bb-admin/blogs", use_filename: true }
        : { public_id: body?.metaData?.public_id }),
      resource_type: "raw",
      overwrite: !!body?.metaData?.public_id,
      invalidate: !!body?.metaData?.public_id,
      context: `title=${body?.data?.title || ""}|poster=${body?.data?.image || ""}|category=${
        body?.data?.category || ""
      }|price=${body?.data?.priceCategory}|| ""`,
      tags: body?.data?.tags || [],
    });
    rm(filename, (err) => {
      console.log(err);
    });
    return new Response(JSON.stringify(res), {
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
export async function DELETE(req: NextRequest) {
  if (req.body) {
    const body = await req.json();
    console.log("bbbb", body);
    try {
      const result = await cloudinary.uploader.destroy(body?.public_id, { resource_type: "raw" });
      return new Response(JSON.stringify(result), {
        status: 200,
      });
    } catch (e) {
      console.log(e);
      return new Response(JSON.stringify(e), {
        status: 400,
      });
    }
  }
}
