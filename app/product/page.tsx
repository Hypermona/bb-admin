"use client";
import ProductCard from "@/components/product/Card";
import Header from "@/components/product/Header";
import Link from "next/link";
import useSWR, { SWRResponse } from "swr";
import React, { useMemo, useReducer, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteData, getData } from "@/lib/dataservices";
import { CreateWishList } from "@/components/wishlist/createWishListDialog";
import { PRODUCT, PRODUCT_CARD } from "@/lib/constants";
import WishList from "@/components/wishlist/wishList";

type Props = {};

const Products = (props: Props) => {
  const {
    data: productData,
    isLoading,
    mutate,
  }: SWRResponse<resProductFields[], any, any> = useSWR<resProductFields[]>(
    "/api/product/",
    getData
  );

  const handleDelete = async (id) => {
    await deleteData(id);
    mutate(productData?.filter((e) => e.id !== id));
  };
  const router = useRouter();
  const [selected, setSelected] = useState<Map<string, resProductFields>>(new Map());

  const changeSelected = (checked: resProductFields) => {
    setSelected((prevSelected: Map<string, resProductFields>) => {
      if (prevSelected?.has(checked.id)) {
        prevSelected.delete(checked.id);
        return new Map(prevSelected);
      } else {
        return new Map(prevSelected?.set(checked.id, checked));
      }
    });
  };
  const action = useMemo(
    () => (
      <div className="flex gap-2">
        {/* <Link href={{ pathname: "/add", query: { type: PRODUCT, isLocked: true } }}>
          <Button>+ Products Blog</Button>
        </Link> */}
        <WishList selected={Array.from(selected.values())} />
        <Button onClick={() => router.push("/product/")}>Import</Button>
        <Button onClick={() => router.push("/product/add")}>Add Products</Button>
      </div>
    ),
    [selected]
  );
  console.log(productData);
  if (!isLoading) {
    return (
      <div>
        <Header title="Products List" Action={action} />
        <div className="flex gap-2 mt-[10px] p-[30px]">
          {productData?.map((data: resProductFields) => (
            <ProductCard
              handleDelete={handleDelete}
              key={data.id}
              selected={selected.has(data.id)}
              changeSelected={changeSelected}
              card={data}
              permissions={{ edit: true, delete: true, select: true }}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Products;
