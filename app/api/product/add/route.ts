import { NextResponse } from "next/server";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);
  try {
    const docRef = await addDoc(collection(db, "products"), res.data);

    console.log("Document written with ID: ", docRef.id);
    return NextResponse.json({ res: docRef.id, status: 200 });
  } catch (e) {
    console.error("Error adding document: ", e);
    return NextResponse.json({ err: e });
  }
}

export async function PUT(request: Request) {
  const res = await request.json();
  console.log(res);
  try {
    await updateDoc(doc(db, "products", res.id), res.data);
    return NextResponse.json({ res: "success", status: 200 });
  } catch (e) {
    console.error("Error adding document: ", e);
    return NextResponse.json({ err: e });
  }
}
