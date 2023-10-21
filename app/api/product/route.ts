import { NextResponse } from "next/server";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  const querySnapshot = await getDocs(collection(db, "products"));
  let res: resProductFields[] = [];
  querySnapshot.forEach((doc) => {
    let data: ProductFields = <ProductFields>doc.data();
    res.push({ id: doc.id, ...data });
  });

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
