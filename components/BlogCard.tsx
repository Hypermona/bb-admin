import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { getData } from "@/lib/dataservices";
import Link from "next/link";
import { Button } from "./ui/button";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

interface Data {
  title?: string;
  description?: string;
  image?: string;
}

function BlogCard({ metaData }: { metaData: any }) {
  const { data, isLoading } = useSWR(metaData?.secure_url, getData);
  console.log(data);
  const handleDelete = async () => {
    await fetch("api/add", {
      method: "DELETE",
      body: JSON.stringify({ public_id: metaData?.public_id }),
    });
  };
  return (
    !isLoading && (
      <div className="w-[250px] h-[400px] overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="absolute">
          <Button onClick={handleDelete}>
            <TrashIcon />
          </Button>
          <Link
            href={{
              pathname: "/add",
              query: {
                fetch_url: metaData?.secure_url,
                metaData: JSON.stringify({ public_id: metaData.public_id }),
              },
            }}
          >
            <Button>
              <Pencil2Icon />
            </Button>
          </Link>
        </div>

        <Image
          className="rounded-t-lg"
          src={data.image!}
          alt={data.title!}
          width={250}
          height={250}
        />
        <div className="p-3">
          <a href="#">
            <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
              {data.title}
            </h5>
          </a>
          <p className="mb-3 overflow-hidden font-normal text-gray-700 dark:text-gray-400">
            {data.shortDescription}
          </p>
        </div>
      </div>
    )
  );
}

export default BlogCard;
