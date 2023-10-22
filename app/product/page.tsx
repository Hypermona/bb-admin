"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import WishList from "@/components/wishlist/wishList";
import ProductList from "@/components/product/ProductList";

type Props = {};

const Products = (props: Props) => {
  const router = useRouter();

  const action = (
    <div className="flex gap-2">
      <Button onClick={() => router.push("/product/")}>Import</Button>
      <Button onClick={() => router.push("/product/add")}>Add Products</Button>
    </div>
  );

  return (
    <ProductList
      Action={WishList}
      SubActions={action}
      productPermissions={{ select: true, delete: true, edit: true }}
    />
  );
};

export default Products;
