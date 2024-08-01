"use client"
import React, { useEffect } from 'react'
import { notebook } from '@/app/types/notebook';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useToast } from '@/components/ui/use-toast';


const Options = ({ params }: { params: {id: number} }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [ journal, setJournal ] = useState<notebook | null>(null);
    const { toast } = useToast();
    const notebookId = params.id;

    useEffect(() => {
        if(status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status])

    async function fetchNotebook() {
        const response = await fetch(`/api/user/notebooks/${notebookId}`, {
            method: "GET"
        });

        if(response.status === 200) {
            const data = await response.json();
            console.log(data[0]);
            if(data.length === 0) {
                toast({
                    title: "Oops! Something went wrong!",
                    description: "This notebook does not exist.",
                    variant: 'destructive'
                })
                router.push('/')
            }
            setJournal(data[0]);
        } else {
            toast({
                title: "Oops! Something went wrong!",
                description: "There was a problem fetching the notebook.",
                variant: 'destructive'
            })
            router.push('/')
        }
    }

    useEffect(() => {
        fetchNotebook();
    }, [])


  return (
    <div className = {`lg:h-[90%] lg:w-[80%] bg-white place-self-center`}>
        Options
    </div>
  )
}

export default Options