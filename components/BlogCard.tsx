import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { getData } from "@/lib/dataservices";
import Link from "next/link";
import { Button } from "./ui/button";
import { CopyIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { getFileName } from "@/lib/helpers";

interface Data {
  metaData: any;
  handleDelete: (id) => void;
}

function BlogCard({ metaData, handleDelete }: Data) {
  const { data, isLoading } = useSWR(metaData?.secure_url, getData);
  console.log(data);

  return (
    !isLoading && (
      <div className="w-[250px] h-[400px] overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="absolute">
          <Button onClick={() => handleDelete(metaData?.public_id)}>
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
          <Link
            href={{
              pathname: "/add",
              query: {
                fetch_url: metaData?.secure_url,
                metaData: JSON.stringify({ public_id: metaData.public_id }),
                copy: true,
              },
            }}
          >
            <Button>
              <CopyIcon />
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
          <a
            href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/posts${getFileName(
              metaData?.public_id,
              metaData.folder
            )}`}
            target="_blank"
          >
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
