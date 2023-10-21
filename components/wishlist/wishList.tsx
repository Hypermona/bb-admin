import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CardStackIcon, TrashIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { PRODUCT } from "@/lib/constants";

const WishCard = ({ data }: { data: resProductFields }) => {
  return (
    <Card className="my-2 pt-3">
      <CardContent className="flex items-center justify-between">
        <div>
          {data.title}
          {/* <Badge variant={"outline"}>{data.products.length}</Badge> */}
        </div>
        <div className="flex items-center justify-between">
          <Button variant={"destructive"} className="p-2">
            <TrashIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function WishList({ selected }: { selected: resProductFields[] }) {
  return (
    <Sheet>
      {selected.length > 0 && (
        <SheetTrigger asChild>
          <Button variant="secondary">
            <CardStackIcon className="mr-2" />
            Create Review
          </Button>
        </SheetTrigger>
      )}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Wishlist</SheetTitle>
          <SheetDescription>Find All Your Wishlist here</SheetDescription>

          <Button>
            <Link
              href={{
                pathname: "/add",
                query: { type: PRODUCT, isLocked: true, selected: JSON.stringify(selected) },
              }}
            >
              + Create
            </Link>
          </Button>
        </SheetHeader>
        {selected?.map((wish) => <WishCard key={wish.id} data={wish} />)}
      </SheetContent>
    </Sheet>
  );
}
