"use client";

import React from "react";

import Image from "next/image";
import { APPS } from "@/lib/constants";
import Content from "@/context/content";
import { useRouter } from "next/navigation";

type Props = {};

const Page = (props: Props) => {
  const { changeAppDetails } = Content.useContainer();
  const router = useRouter();
  return (
    <div className="container  flex justify-center items-center h-[100vh]">
      <div className="bg-slate-800 rounded-xl p-10 ">
        <p className="text-2xl tracking-tight font-bold pb-5 text-slate-300">
          Select a Application
        </p>
        <div className="flex gap-10">
          {APPS.map((app) => (
            <div
              tabIndex={0}
              onClick={() => {
                changeAppDetails(app);
                router.replace("/home");
              }}
              role="button"
              key={app.id}
              className="bg-slate-900 relative cursor-pointer h-[170px] w-[300px]  flex justify-center items-center rounded-xl"
            >
              {app.env === "DEV" && (
                <div className="top-0 right-0 px-5 py-1 rounded-tr-md rounded-bl-md bg-red-800 absolute">
                  DEV
                </div>
              )}
              {app?.logo ? (
                <Image
                  src={app.logo.src}
                  height={180}
                  width={300}
                  className="rounded-lg object-contain"
                  alt={app?.label}
                />
              ) : (
                <p className="text-slate-300 tracking-tight font-bold text-3xl">{app.label}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
