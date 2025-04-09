"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { Card, Flex } from '@radix-ui/themes';
import Image from 'next/image';
import userIcon from '@/public/user.png';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { user } from '@/app/types/user';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const Profile = () => {
    const {data: session, status} = useSession();
    const { toast } = useToast();
    const [ userDetails, setUserDetails ] = useState<user | null>(null)
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);  
    const user = session?.user;
    const [newName, setNewName] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            redirect('/login');
        }
    }, [session, status]);

    async function fetchUser() {
      const response = await fetch(`/api/user/profile/${user?.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(response.ok) {
        const data: user = await response.json();
        setUserDetails(data);
      } else {
        toast({
          title: "Oops! Something went wrong",
          description: "There was a problem fetching your profile.",
          variant: "destructive"
        });
      }
    }

    async function updateUser() {
      const data = new FormData();
      if(image) {
        data.append('file', image);
      }
      if(newName) {
        data.append('name', newName);
      }

      console.log(data);

      const response = await fetch(`/api/user/profile/${user?.email}/update`, {
        method: 'PATCH',
        body: data
      });

      if(response.ok) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
        fetchUser();
        window.location.reload();
      } else {
        toast({
          title: "Oops! Something went wrong",
          description: "There was a problem updating your profile.",
          variant: "destructive"
        });
      }
    }

    useEffect(() => {
      if(user) {
        fetchUser();
      }
    }, [user, fetchUser]);

    return (
        <div className = "min-h-screen bg-black min-w-screen flex flex-col place-items-center">
            <span className = {`text-4xl mb-10`}>My Profile</span>
            <div>
            <span className = {`text-lg mb-2 text-left underlineAnimation cursor-pointer`} onClick = {() => {
        router.back();
      }}>{'\u2190'} Back</span>
            <Card className = {`sm:w-[90vw] sm:h-[80dvh] md:w-[70dvw] md:h-auto lg:w-[60dvw] lg:h-auto flex flex-col place-items-center`}>
              <Flex align = {'center'} direction={`column`} >
                <Image src={userDetails?.image_url || userIcon} height={`200`} width = {`200`} alt = "profile-image" className = {`rounded-full aspect-square object-cover`}/>
                <div className="grid w-full max-w-sm items-center gap-1.5 p-5">
                  <Label htmlFor="picture">Picture</Label>
                  <Input id="picture" type="file" onChange={(event) => {
                    const file = event.target.files?.[0];
                    if(file) {
                      setImage(file);
                    }
                  }}/>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 p-5">
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name" placeholder={userDetails?.name} defaultValue={userDetails?.name} onChange={(event) => {
                    setNewName(event.target.value);
                  }}/>
                </div>
                <div className = {`flex gap-10`}>
                  <button onClick = {updateUser} className = {`bg-black text-white rounded-md mt-5 underlineAnimation place-self-start`}>Update</button>
                  <button className = {`bg-black text-white rounded-md mt-5 underlineAnimationRed place-self-start`}>Delete Account</button>
                </div>
              </Flex>
            </Card>
            </div>
        </div>
    )
}

export default Profile;