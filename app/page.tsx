"use client"
import Notebook from "@/components/notebook/Notebook";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [notebooks, setNotebooks] = useState([]);
  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
}, [status])

  useEffect(() => {
    async function fetchNotebooks() {
      const res = await fetch('/api/user/notebooks');
      const data = await res.json();
      setNotebooks(data);
    }
    fetchNotebooks();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-black">
      <h1 className = "text-4xl text-white">My Notebooks</h1>
      <div className = "grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-20 mt-5">
      {session && 
        notebooks.map((notebook: any, index) => {
          return (
            <Notebook editMode = {false} id={notebook.id} title={notebook.title} description={notebook.description} image={notebook.image} />
          )
        })
      }
      </div>
    </main>
  );
}
