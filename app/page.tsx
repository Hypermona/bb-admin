"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const addNewBlog = () => router.push("/add");
  const addNewProduct = () => router.push("/product");

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
    </main>
  );
}
