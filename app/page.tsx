"use client";

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const addNew = ()=> router.push("/add")
  return (
    <main className="flex w-full h-full min-h-screen flex-col items-center justify-between p-24">
        <Button onClick={addNew}>Add New</Button>
    </main>
  );
}
