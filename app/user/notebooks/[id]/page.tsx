"use client";
import { useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { page } from '@/app/types/page';

import Loader from "@/components/loader/Loader";
import Page from '@/components/page/Page';
import CreatePageButton from '@/components/createPage/createPageButton';

export default function Pages({ params }: { params: { id: number } }) {
    // return(<Loader />)
    const {data: session, status} = useSession();
    const router = useRouter();
    const notebookId = params.id
    const [title, setTitle] = useState('New Page');
    const [updatedAt, setUpdatedAt] = useState('');
    const [pages, setpages] = useState([]);
    const id = params.id;

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status])

    async function fetchPages() {
        try {
            const response = await fetch(`/api/user/notebooks/pages?notebookId=${notebookId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            setpages(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPages();
    }, [notebookId])

    async function createPage() {
        const response = await fetch(`/api/user/notebooks/pages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({notebookId: notebookId, title: title, content: ''}),
        })

        if (response.ok) {
            router.push(`/user/pages/${id}`);
        } else {
            window.alert('Failed to create page');
        }
    }

    return (
        <div className="min-h-screen max-w-screen bg-black min-w-screen flex flex-col p-4 gap-5">
            <span className = {`place-self-start text-lg mb-2 text-left underlineAnimation cursor-pointer max-w-[60px]`} onClick = {() => {
                   router.back();
                 }}>{'\u2190'} Back
            </span>
            <div className = {`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-20`}>
            <CreatePageButton notebookId={id} />
                {
                    pages.map((page: any, key) => <Page id = {page.id} title = {page.title} key = {key} />)
                }
            </div>
        </div>
    )
}