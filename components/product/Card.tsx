import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

function ProductCard({}: Props) {
  return (
    <Card className="h-[250px] w-[200px]">
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
    </Card>
  );
}

export default ProductCard;
