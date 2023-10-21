import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";
import { currencyFormatter } from "@/lib/helpers";

type Props = {
  data: resProductFields;
};

const HorizontalCard = ({ data }: Props) => {
  return (
    <Card className="my-3">
      <CardContent className="flex pt-3">
        <Image src={data.image} width={150} height={150} alt={data.title} className="rounded-md" />
        <div className="p-2">
          <CardTitle className="leading-5">{data.title}</CardTitle>
          <CardDescription>{currencyFormatter(data.price)}</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export default HorizontalCard;
