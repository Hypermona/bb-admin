"use client";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import AddForm from "@/components/AddForm";

function AddNew() {
  const router = useRouter();
  const goBack = () => router.push("/");
  return (
    <div className="container py-5">
      <nav className="w-full h-20 flex">
        <Button onClick={goBack}>Go Back</Button>
      </nav>
      <div className="flex justify-center">
        <AddForm />
      </div>
    </div>
  );
}

export default AddNew;
