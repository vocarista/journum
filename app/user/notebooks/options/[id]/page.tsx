"use client"
import React, { useEffect } from 'react'
import { notebook } from '@/app/types/notebook';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useToast } from '@/components/ui/use-toast';
import { Card, Flex } from '@radix-ui/themes';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

const formSchema = z.object({
    title: z.string().min(5, {
        message: "Title should be at least 5 characters."
    }).max(50, {
        message: "Title should be at most 50 characters."
    }),
    description: z.string().max(180, {
        message: "Description should be at max 180 characters."
    })
})


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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: journal?.title,
            description: journal?.description 
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch(`/api/user/notebooks/${notebookId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: values.title,
                description: values.description,
            })
        })

        if(response.ok) {
           let newNotebook: notebook | null = null
            if(journal !== null) {
            newNotebook = {
                ...journal,
                title: values.title,
                description: values.description,
               }
           }
           setJournal(newNotebook);
           toast({
            title: "Success!",
            description: "Notebook updated Successfully."
           })
        } else {
            toast({
                title: "Oops! Something went wrong.",
                description: "Failed to update notebook, please try again later.",
                variant: "destructive"
            })
        }
    }

    useEffect(() => {
        if(journal) {
            form.reset({
                title: journal.title,
                description: journal.description
            })
        }
    }, [journal])

    async function deleteNotebook() {
        const response = await fetch(`/api/user/notebooks/${notebookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.status == 200) {
            toast({
                title: 'Notebook Deleted',
                description: `"${journal?.title}" was deleted successfully.`,
                variant: "destructive"
            })
            router.push('/')
        } else {
            toast({
                title: 'Oops! Something went wrong',
                description: 'There was a problem deleting the notebook, please try again later.',
                variant: 'destructive'
            })
        }
    }

    useEffect(() => {
        if(journal) {
            setTitle(journal.title);
            setDescription(journal.description)
        }
    }, [journal])
    const [showMore, setShowMore] = useState(false)
    const [title, setTitle] = useState<string>(journal?.title || "title")
    const [description, setDescription] = useState<string>(journal?.description || 'description');

  return (
    <div className = {`min-h-[90vh] w-full bg-black flex flex-col place-items-center`}>
        <span className = {`text-4xl mb-10`}>Options</span>
        <Card className = {`sm:w-[90vw] sm:h-[80dvh] md:w-[70dvw] md:h-auto lg:w-[60dvw] lg:h-auto flex flex-col place-items-center`}>
            <Flex align={'center'} direction={'column'}>
            <div
              className={`mt-5 mb-5 w-[350px] min-h-[200px] bg-gradient-to-br from-amber-50 to-amber-200 rounded-2xl shadow-xl shadow-zinc-700  p-3 relative overflow-hidden hover:shadow-xl hover:shadow-zinc-600 hover:scale-105 transition-transform duration-300`}
              onMouseEnter={() => setShowMore(true)}
              onMouseLeave={() => setShowMore(false)}
            >
              <div title={title} className={`text-black text-3xl font-bold`}>
                {title.length > 60 ? title.substring(0, 60) + "..." : title}
              </div>
              <div
                className={`absolute bottom-0 left-0 right-0 bg-zinc-900 transition-transform duration-300 ease-in-out shadow-md shadow-white ${
                  showMore ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                <div className={`p-4`}>
                  <p className={`text-amber-50 text-lg`}>{description}</p>
                </div>
              </div>
            </div>
            <Form {...form} >
                <form onSubmit = {form.handleSubmit(onSubmit)} className = {`space-y-8 w-[90%]`}>
                    <FormField control = {form.control}
                    name = "title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder = {journal?.title} {...field} />
                            </FormControl>
                            <FormMessage className = "text-red-500" />
                        </FormItem>
                    )}>
                    </FormField>
                    <FormField control = {form.control}
                    name = "description"
                    render = {({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder = {journal?.description} {...field}/>
                            </FormControl>
                            <FormMessage className = "text-red-500" />
                        </FormItem>
                    )}>
                    </FormField>
                    <Button type = "submit"><span className = {`underlineAnimation p-0 text-lg`} >Save {'\u2714'}</span></Button>
                    <AlertDialog>
                      <AlertDialogTrigger><span className = {'lg:ml-10 text-lg underlineAnimationRed p-0 cursor-pointer'}>Delete Notebook 🗑️</span></AlertDialogTrigger>
                      <AlertDialogContent className = "bg-zinc-950">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this notebook.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className = "bg-red-600"  onClick = {() => {
                            deleteNotebook();
                        }}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                </form>
            </Form>
            </Flex>
        </Card>
    </div>
  )
}

export default Options