"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Card, Flex } from "@radix-ui/themes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title should be at least 5 characters.",
  }).max(50, {
    message: "Title should be at most 50 characters.",
  }),
  description: z.string().min(5, {
    message: "Description should be at least 5 characters."
  }).max(180, {
    message: "Description should be at max 180 characters.",
  })
});

const CreateNotebook = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(`/api/user/notebooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: values.title,
        description: values.description,
      }),
    });

    if (response.ok) {
      toast({
        title: "Success!",
        description: "Notebook created Successfully.",
      });
      router.push("/");
    } else {
      toast({
        title: "Oops! Something went wrong.",
        description: "Failed to update notebook, please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-[90vh] w-full bg-black flex flex-col place-items-center">
      <span className="text-4xl mb-10">New Notebook</span>
      <div>
      <span className = {`text-lg mb-2 text-left underlineAnimation cursor-pointer`} onClick = {() => {
        router.back();
      }}>{'\u2190'} Back</span>
      <Card className="sm:w-[90vw] sm:h-[80dvh] md:w-[70dvw] md:h-auto lg:w-[60dvw] lg:h-auto flex flex-col place-items-center">
        <Flex align={"center"} direction={"column"}>
          <div
            className={`mt-5 mb-5 w-[350px] min-h-[200px] bg-gradient-to-br from-amber-50 to-amber-200 rounded-2xl shadow-xl shadow-zinc-700 p-3 relative overflow-hidden hover:shadow-xl hover:shadow-zinc-600 hover:scale-105 transition-transform duration-300`}
            onMouseEnter={() => setShowMore(true)}
            onMouseLeave={() => setShowMore(false)}
          >
            <div title={form.watch("title")} className="text-black text-3xl font-bold">
              {form.watch("title").length > 60 ? form.watch("title").substring(0, 60) + "..." : form.watch("title")}
            </div>
            <div
              className={`absolute bottom-0 left-0 right-0 bg-zinc-900 transition-transform duration-300 ease-in-out shadow-md shadow-white ${
                showMore ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="p-4">
                <p className="text-amber-50 text-lg">{form.watch("description")}</p>
              </div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[90%]">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )} />
              <Button type="submit">
                <span className="underlineAnimation p-0 text-lg flex place-items-center">Create {'\uff0b'}</span>
              </Button>
            </form>
          </Form>
        </Flex>
      </Card>
      </div>
    </div>
  );
};

export default CreateNotebook;
