"use client";
import ProductCard from "@/components/product/Card";
import Header from "@/components/product/Header";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Products = (props: Props) => {
  const router = useRouter();
  const action = {
    label: "Add Product",
    onClick: () => router.push("/product/add"),
  };
  return (
    <div>
      <Header title="Products List" action={action} />
      <ProductCard />
    </div>
  );
};

export default Products;
