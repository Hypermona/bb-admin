"use client";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import AddForm from "@/components/AddForm";
import UploadImages from "@/components/UploadImages";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import SelectEditorType from "@/components/SelectEditorType";

function AddNew() {
  const router = useRouter();
  const goBack = () => router.push("/");

  return (
    <div className="container py-5">
      <nav className="w-full h-20 flex sticky top-[10px]">
        <Button onClick={goBack} className="mr-auto">
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <UploadImages />
        <SelectEditorType />
      </nav>
      <div className="flex justify-around">
        <AddForm />
      </div>
    </div>
  );
}

export default AddNew;
