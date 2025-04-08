"use client";
import Image from 'next/image';
import darkLogo from "@/public/logo-dark.png";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import userIcon from '../../public/user.png';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import noteBookIcon from '../../public/book.png';
import { user } from '@/app/types/user';
import { useToast } from '../ui/use-toast';

function Navigation() {
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState<user | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (status !== 'loading' && !session) {
      redirect("/api/auth/signin");
    }
  }, [session]);

  async function fetchUser() {
    const response = await fetch(`/api/user/profile/${session?.user?.email}`, {
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

  useEffect(() => {
    if(session) {
      fetchUser();
    }
  }, [session]);

  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
          <div className="mx-auto max-w-7xl px-2 sm:px-6">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link href="/user/notebooks/create" className="p-2 underlineAnimation">
                  <span className="flex gap-1">
                    <Image src={noteBookIcon} height={20} alt="notebook icon" />
                    {'\uff0b'}
                  </span>
                </Link>
                <Link href="/" className="ml-4 flex-shrink-0">
                  <Image src={darkLogo} height={50} alt="logo" />
                </Link>
              </div>
              <Menu as="div" className="relative">
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <Image className="rounded-full aspect-square object-cover" src={userDetails?.image_url ? userDetails?.image_url : userIcon} height={40} alt="avatar" width={40} />
                </Menu.Button>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-zinc-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/user/profile" className={`${active ? 'bg-zinc-800' : ''} block px-4 py-2 text-sm text-white`}>
                          My Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="#" className={`${active ? 'bg-zinc-800' : ''} block px-4 py-2 text-sm text-white`}>
                          Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/api/auth/signout" className={`${active ? 'bg-zinc-800' : ''} block px-4 py-2 text-sm text-white`}>
                          Sign out
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
      )}
    </Disclosure>
  );
}

export default Navigation;
