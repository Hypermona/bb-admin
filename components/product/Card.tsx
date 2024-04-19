import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currencyFormatter } from "@/lib/helpers";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { CopyIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  card: resProductFields;
  selected: boolean;
  changeSelected: (checked: resProductFields) => void;
  handleDelete: (id: string) => void;
  permissions: { select: boolean; delete: boolean; edit: boolean; copy: boolean };
  disabled: boolean;
};

function ProductCard({
  card,
  selected,
  changeSelected,
  handleDelete,
  permissions,
  disabled,
}: Props) {
  return (
    <Card className={`relative h-[330px] w-[250px] p-1 ${disabled ? "opacity-50" : ""}`}>
      {permissions.select && (
        <div className="absolute right-1 p-1 m-1 bg-foreground leading-3 rounded-sm">
          <Checkbox
            checked={selected}
            disabled={disabled}
            className="border-background"
            onCheckedChange={() => changeSelected(card)}
          />
        </div>
      )}
      <div className="absolute opacity-0 hover:opacity-100">
        {permissions.edit && (
          <Link href={{ pathname: "/product/add", query: { data: JSON.stringify(card) } }}>
            <Button>
              <Pencil2Icon />
            </Button>
          </Link>
        )}
        {permissions.copy && (
          <Link
            href={{ pathname: "/product/add", query: { data: JSON.stringify(card), copy: true } }}
          >
            <Button>
              <CopyIcon />
            </Button>
          </Link>
        )}
        {permissions.delete && (
          <Button onClick={() => handleDelete(card.id)}>
            <TrashIcon />
          </Button>
        )}
      </div>

      <div className="relative w-[200px] h-[200px] overflow-hidden">
        <Image src={card.image} width={250} height={250} alt={card.title} className="rounded-md" />
      </div>
      <div className="p-2">
        <CardTitle className="h-[40px] overflow-hidden leading-5">{card.title}</CardTitle>
        <CardDescription>{currencyFormatter(card.price)}</CardDescription>
      </div>
    </Card>
  );
}

export default ProductCard;
