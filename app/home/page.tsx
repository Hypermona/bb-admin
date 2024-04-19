"use client";

import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import Content from "@/context/content";
import { getData } from "@/lib/dataservices";
import letConfirm from "@/lib/letConfirm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function Home() {
  const router = useRouter();
  const {
    content: { appDetails },
  } = Content.useContainer();
  const addNewBlog = () => router.push("/add");
  const addNewProduct = () => router.push("/product");
  const { data: posts, mutate } = useSWR(`/api/add?folder=${appDetails?.folder}`, getData);
  console.log(posts);

  const handleDelete = async (id) => {
    console.log("id", id);
    const confirm = await letConfirm();
    if (confirm) {
      console.log("confirm");
      const res = await fetch("api/add", {
        method: "DELETE",
        body: JSON.stringify({ public_id: id }),
      });
      console.log("res", res);
      if (!res.ok) {
        toast({
          description: <p className="text-red-500">Deleting Post {id} Failed!</p>,
        });
      } else {
        toast({
          description: <p className="text-green-500">Successfully Deleted {id}</p>,
        });
      }
      mutate(posts?.filter((e) => e.public_id !== id));
    }
  };

  return (
    <main className="flex w-full h-full min-h-screen flex-col items-center justify-between p-24 pt-12">
      <div className="bg-slate-900 cursor-pointer h-[100px] w-[100%] mb-5  flex justify-center items-center rounded-xl">
        <p className="text-slate-300 tracking-tight font-bold text-3xl">{appDetails?.label}</p>{" "}
        <Link href={"/"} className="align-bottom ml-3 underline">
          Change
        </Link>
      </div>
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
        {posts?.map((p: any, i: any) => (
          <BlogCard key={p?.public_id} metaData={p} handleDelete={handleDelete} />
        ))}
      </div>
    </main>
  );
}
