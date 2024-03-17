import { NextResponse } from "next/server";
import { and, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(req: Request) {
  console.log("qqqqqq", new URL(req.url).searchParams.get("q"));
  const search = new URL(req.url).searchParams.get("q");
  const querySnapshot =
    search !== ""
      ? await getDocs(
          query(
            collection(db, "products"),
            where("search", ">=", search),
            where("search", "<=", search + "\uf8ff")
          )
        )
      : await getDocs(collection(db, "products"));
  let res: resProductFields[] = [];
  querySnapshot.forEach((doc) => {
    let data: ProductFields = <ProductFields>doc.data();
    res.push({ ...data, id: doc.id });
  });
  console.log(res);
  return NextResponse.json(res);
}
export async function DELETE(request: Request) {
  const res = await request.json();
  try {
    await deleteDoc(doc(db, "products", res.id));
    return NextResponse.json({ res: "success" });
  } catch (e) {
    console.error("Error adding document: ", e);
    return NextResponse.json({ err: e });
  }
}
