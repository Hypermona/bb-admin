import { toast } from "./ui/use-toast";
import useSWRMutation from "swr/mutation";
import LoadingButton from "./LoadingButton";

export default function AddFeature({
  filename = "processors",
  apiPath = "features",
  value,
  onAddSuccess,
}: {
  filename?: string;
  apiPath?: string;
  value: string;
  onAddSuccess: () => void;
}) {
  // make this common

  const handleSubmit = async () => {
    console.log(value);
    try {
      let res = await fetch("/api/" + apiPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { filename, value: value } }),
      });
      console.log("sr", res);
      if (res.status === 200) {
        onAddSuccess();
        toast({
          description: <p className="text-green-700">Successfully Added</p>,
        });
        console.log("successs Add");
      } else {
        toast({
          description: <p className="text-red-700">Failed to Add</p>,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const { trigger, isMutating } = useSWRMutation("/api/" + apiPath, handleSubmit);
  return (
    <LoadingButton disabled={isMutating} variant="outline" onClick={() => trigger()}>
      Add this
    </LoadingButton>
  );
}
