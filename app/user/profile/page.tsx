"use client"
import React, { useEffect, } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { AlertDialog, Button, Flex, Table, } from '@radix-ui/themes';
import Image from 'next/image';
import userIcon from '@/public/user.png';
import Link from 'next/link';

const Profile = () => {
    const {data: session, status} = useSession();
     
    const user = session?.user;
    const name = user?.name;
    const email = user?.email;
    const image = user?.image;

    // const [newName, setNewName] = useState('');
    // const [newEmail, setNewEmail] = useState('');
    
    useEffect(() => {
        if (status !== 'loading' && !session) {
            redirect('api/auth/signin');
        }
    }, [session])

    return (
        <div className = "min-h-screen bg-black min-w-screen flex flex-col place-items-center">
            <Flex className = "gap-4 w-[80vw] flex flex-col place-items-center min-h-10 shadow-neutral-700">
                <Image src={image || userIcon} alt="profile image" width={200} height={200} className = "rounded-full"/>
                <Table.Root variant="ghost" className = "my-10">
                  <Table.Body>
                    <Table.Row>
                      <Table.RowHeaderCell><span className = "font-semibold text-2xl">Name:</span></Table.RowHeaderCell>
                        <Table.Cell><span className = "text-3xl">{name}</span></Table.Cell>
                        <Table.Cell><AlertDialog.Root>
                          <AlertDialog.Trigger>
                            <Button variant="soft">Edit</Button>
                          </AlertDialog.Trigger>
                          <AlertDialog.Content maxWidth="450px">
                            <AlertDialog.Title>Edit Name</AlertDialog.Title>
                            <AlertDialog.Description size="2">
                              Enter new Name
                              <input type="text" className = "w-full mt-2 p-2 rounded-md"/>
                            </AlertDialog.Description>

                            <Flex gap="3" mt="4" justify="end">
                              <AlertDialog.Cancel>
                                <Button variant="soft" color="gray">
                                  Cancel
                                </Button>
                              </AlertDialog.Cancel>
                              <AlertDialog.Action>
                                <Button variant="solid" color="red">
                                  Confirm
                                </Button>
                              </AlertDialog.Action>
                            </Flex>
                          </AlertDialog.Content>
                        </AlertDialog.Root></Table.Cell>
                    </Table.Row>

                    <Table.Row>
                    <Table.RowHeaderCell><span className = "font-semibold text-2xl">Email:</span></Table.RowHeaderCell>
                      <Table.Cell><span className = "text-3xl">{email}</span></Table.Cell>
                      <Table.Cell><AlertDialog.Root>
                          <AlertDialog.Trigger>
                            <Button variant="soft">Edit</Button>
                          </AlertDialog.Trigger>
                          <AlertDialog.Content maxWidth="450px">
                            <AlertDialog.Title>Edit Email</AlertDialog.Title>
                            <AlertDialog.Description size="2">
                              Enter new Email
                              <input type="text" className = "w-full mt-2 p-2 rounded-md"/>
                            </AlertDialog.Description>

                            <Flex gap="3" mt="4" justify="end">
                              <AlertDialog.Cancel>
                                <Button variant="soft" color="gray">
                                  Cancel
                                </Button>
                              </AlertDialog.Cancel>
                              <AlertDialog.Action>
                                <Button variant="solid" color="red">
                                  Confirm
                                </Button>
                              </AlertDialog.Action>
                            </Flex>
                          </AlertDialog.Content>
                        </AlertDialog.Root></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
                <Link href="/"><Button size = "4" variant = "ghost">My Notebooks</Button></Link>
            </Flex>
        </div>
    )
}

export default Profile;