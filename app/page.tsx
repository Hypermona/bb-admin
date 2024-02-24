"use client";

import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getData } from "@/lib/dataservices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function Home() {
  const router = useRouter();
  const addNewBlog = () => router.push("/add");
  const addNewProduct = () => router.push("/product");
  const { data: posts } = useSWR("/api/add", getData);
  console.log(posts);

  return (
    <main className="flex w-full h-full min-h-screen flex-col items-center justify-between p-24">
      <Card className="flex w-[700px] p-5 flex-wrap gap-6">
        <Card className="flex w-[200px] p-5">
          <Button className="m-auto" variant={"link"} onClick={addNewBlog}>
            Add New Blog
          </Button>
        </Card>
        <Card className="flex w-[200px] p-5">
          <Button className="m-auto" variant={"link"} onClick={addNewProduct}>
            Goto Products
          </Button>
        </Card>
        <Card className="flex w-[200px] p-5">
          <Link className="m-auto" href={"/ml"} target="__blank">
            Media Library
          </Link>
        </Card>
      </Card>
      <div className="flex flex-wrap gap-4 gap-y-20 mt-5">
        {posts?.map((p: any, i: any) => <BlogCard key={i} metaData={p} />)}
      </div>
    </main>
  );
}
