"use client";
import ProductCard from "@/components/product/Card";
import Header from "@/components/product/Header";
import useSWR, { SWRResponse } from "swr";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { deleteData, getData } from "@/lib/dataservices";
import AdvancedSearch from "../advancedSearch";
import { toast } from "../ui/use-toast";
import letConfirm from "@/lib/letConfirm";

type Props = {
  Action?: React.FC<actionType>;
  SubActions?: JSX.Element;
  productPermissions: { select: boolean; delete: boolean; edit: boolean; copy: boolean };
  onSubmit?: Function;
  preSelected?: resProductFields[];
};

const ProductList = ({ Action, SubActions, productPermissions, onSubmit, preSelected }: Props) => {
  const advSearchRef = useRef("");
  const {
    data: productData,
    isLoading,
    mutate,
    isValidating,
  }: SWRResponse<resProductFields[], any, any> = useSWR<resProductFields[]>(
    "/api/product?q=" + advSearchRef.current,
    getData,
    { revalidateOnFocus: false }
  );
  useEffect(() => {
    console.log("Iam recreated", preSelected);
  }, [preSelected, productData]);
  console.log("isValidating", isValidating);

  const handleDelete = async (id) => {
    console.log("id", id);
    const confirm = await letConfirm();
    if (confirm) {
      console.log("confirm");
      const res = await deleteData(id);
      console.log("res", res);
      if (res.failed) {
        toast({
          description: <p className="text-red-500">Deleting Post {id} Failed!</p>,
        });
      } else {
        toast({
          description: <p className="text-green-500">Successfully Deleted {id}</p>,
        });
      }
      mutate(productData?.filter((e) => e.id !== id));
    }
  };
  const preSelectedMap = new Map(preSelected?.map((ele) => [ele.id, ele]));
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
  const clearSelected = () => {
    setSelected(new Map());
  };

  const onSearch = (data) => {
    advSearchRef.current = data?.title || "";
    mutate();
  };
  const action = useMemo(
    () => (
      <div className="flex gap-2">
        {Action && (
          <Action
            selected={Array.from(selected.values())}
            onSubmit={onSubmit}
            clearSelected={clearSelected}
          />
        )}
        {SubActions}
      </div>
    ),
    [Action, SubActions, onSubmit, selected]
  );
  if (!isLoading) {
    return (
      <div>
        <Header
          title="Products List"
          Action={action}
          Search={<AdvancedSearch onSubmit={onSearch} />}
        />
        <div className="flex gap-2 mt-[10px] p-[30px]">
          {productData?.map((data: resProductFields) => (
            <ProductCard
              handleDelete={handleDelete}
              key={data.id}
              selected={selected.has(data.id)}
              disabled={preSelectedMap.has(data.id)}
              changeSelected={changeSelected}
              card={data}
              permissions={productPermissions}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ProductList;
