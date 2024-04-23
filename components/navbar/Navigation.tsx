"use client";
import Image from 'next/image';
import NavDropdown from 'react-bootstrap/NavDropdown';
import darkLogo from "@/public/logo-dark.png"
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button as RadixButton, DropdownMenu, Flex, Button } from '@radix-ui/themes';
import userIcon from '../../public/user.png'
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import noteBookIcon from '../../public/book.png'


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  const {data :session, status} = useSession();
  useEffect(() => {
    if(status !== 'loading' && !session) {
      redirect("/api/auth/signin")
    }
  }, [session])
  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
             
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href = "/">
                    <Image src = {darkLogo} height={50} alt = "logo" />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                   
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link href = "/user/notebooks/create"><Button variant="soft">
              <Image src = {noteBookIcon} height = {20} alt = "notebook icon" /> +
              </Button></Link>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Image className = "rounded-full" src = {session?.user?.image ? session?.user?.image : userIcon} height = {40} alt="avatar" width={40} />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/user/profile"
                            className={classNames(active ? 'bg-gray-800' : '', 'block px-4 py-2 text-sm text-white')}
                          >
                            My Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={classNames(active ? 'bg-gray-800' : '', 'block px-4 py-2 text-sm text-white')}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/api/auth/signout"
                            className={classNames(active ? 'bg-gray-800' : '', 'block px-4 py-2 text-sm text-white')}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
