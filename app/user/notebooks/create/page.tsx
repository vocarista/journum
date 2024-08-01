"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Button, Text } from '@radix-ui/themes';
import Notebook from '@/components/notebook/Notebook';
import * as Form from '@radix-ui/react-form';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function CreateNotebook() {
  const { toast } = useToast();
  const router = useRouter();
    const {data: session, status} = useSession();
    useEffect(() => {
        if (status !== 'loading' && !session) {
            redirect('api/auth/signin');
        }
    }, [session])

    function handleSubmit() {
        async function createNotebook() {
            if (!title || !description) {
                window.alert('Please fill in all fields');
                return;
            }
            const res = await fetch('/api/user/notebooks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title: title, description: description}),
            })

            if (res.ok) {
                toast({
                  title: "Success!",
                  description: "Notebook created successfully."
                })
                router.push('/');
            } else {
              toast({
                title: "Oops! Something went wrong.",
                description: "Notebook creation failed, please try again later."
              })
            }
        }

        createNotebook();
    }

    const [title, setTitle] = useState(localStorage.getItem('title')||'');
    const [description, setDescription] = useState(localStorage.getItem('description')|| '');
    return (
        <div className = "min-h-screen bg-black min-w-screen flex flex-col place-items-center">
            <Text className = "text-4xl">Create Notebook</Text>
            <Notebook editMode = {true} title={title} description={description} />
            <Form.Root className="w-[260px] mt-10">
                <Form.Field className="grid mb-[10px]" name="title" onChange={(event: any) => {
                    setTitle(event.target.value);
                    localStorage.setItem('title', event.target.value);
                }}>
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Title</Form.Label>
                    <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                      Please enter a title
                    </Form.Message>
                    <Form.Message className="text-[13px] text-white opacity-[0.8]" match="typeMismatch">
                      Please provide a title
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                      type="email"
                      required
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field className="grid mb-[10px]" name="question" onChange = {(event: any) => {
                    setDescription(event.target.value);
                    localStorage.setItem('description', event.target.value);
                }}>
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                      Description
                    </Form.Label>
                    <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                      Please enter a Description
                    </Form.Message>
                  </div>
      <Form.Control asChild>
        <textarea value={description}
          className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
          required
        />
      </Form.Control>
    </Form.Field>
    <Form.Submit asChild>
      <Button onClick = {handleSubmit} className="mt-2 text-black box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
        Create
      </Button>
    </Form.Submit>
  </Form.Root>
        </div>
    )
}