// "use client";
// import { useState, useEffect} from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter, useParams } from 'next/navigation';
// // import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { Button, Table } from '@radix-ui/themes';
// import * as Dialog from '@radix-ui/react-dialog';
// import { Cross2Icon } from '@radix-ui/react-icons';

import Loader from "@/components/loader/Loader";

// const modules = {
//     toolbar: [
//         [{ 'header': ['1', '2', '3', '4', '5','6']}, { 'font': [] }],
//         [{size: []}],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{'list': 'ordered'}, {'list': 'bullet'}, 
//          {'indent': '-1'}, {'indent': '+1'}],
//         ['link', 'image', 'video'],
//         ['clean']
//     ],
//     clipboard: {
//       matchVisual: false,
//     }
  
// }

export default function Editor({ params }: { params: { id: number } }) {
    return(<Loader />)
//     const {data: session, status} = useSession();
//     const router = useRouter();
//     const notebookId = params.id
//     const [pageId, setPageId] = useState('');
//     const [content, setContent] = useState('');
//     const [title, setTitle] = useState('New Page');
//     const [pages, setpages] = useState([]);

//     useEffect(() => {
//         if (status === 'unauthenticated') {
//             router.push('/login');
//         }
//     }, [status])

//     async function fetchPages() {
//         try {
//             const response = await fetch(`/api/user/notebooks/pages?notebookId=${notebookId}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             })
//             const data = await response.json();
//             setpages(data);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     useEffect(() => {
//         fetchPages();
//     }, [notebookId])

//     async function savePage() {
//         const response = await fetch(`/api/user/notebooks/pages`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({pageId: pageId, content: content, title: title}),
//         })

//         if (response.ok) {
//             fetchPages();
//             window.alert('Page saved successfully');
//         } else {
//             window.alert('Failed to save page');
//         }
//     }

//     async function createPage() {
//         const response = await fetch(`/api/user/notebooks/pages`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({notebookId: notebookId, title: title, content: ''}),
//         })

//         if (response.ok) {
//             window.alert('Page created successfully');
//             fetchPages();
//         } else {
//             window.alert('Failed to create page');
//         }
//     }

//     return (
//         <div className="min-h-screen max-w-screen bg-black min-w-screen grid lg:grid-cols-2 place-items-start sm:place-items-center">
//             <div className = "ml-10 lg:w-1/3 h-full overflow-y-auto flex flex-col">
//             <Table.Root variant="ghost" className="cursor-pointer flex flex-col bg-gradient-to-br from-slate-400 to-white shadow-lg shadow-neutral-700">
//                 <Table.Header>
//                     <Table.Row>
//                         <Table.ColumnHeaderCell>
//                             <span className="font-semibold text-2xl">Pages</span>
//                         </Table.ColumnHeaderCell>
//                     </Table.Row>
//                 </Table.Header>
//                 <Table.Body>
//                     {pages.map((page: any, index) => (
//                         <Table.Row key={index} className={`hover:bg-gray-900 ${pageId === page.id ? "bg-gray-900" : ""}`} onClick={() => {
//                             setPageId(page.id);
//                             setContent(page.content);
//                             setTitle(page.title);
//                         }}>
//                             <Table.Cell>
//                                 <span className={`text-lg`}>{page.title}</span>
//                             </Table.Cell>
//                         </Table.Row>
//                     ))}
//                 </Table.Body>
//             </Table.Root>
//             <Dialog.Root>
//                 <Dialog.Trigger asChild>
//                 <Button size = "4" variant = "soft" className = "mt-2">Create Page +</Button>
//                 </Dialog.Trigger>
//                 <Dialog.Portal>
//                   <Dialog.Overlay className="bg-black opacity-55 data-[state=open]:animate-overlayShow fixed inset-0" />
//                   <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-900 text-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
//                     <Dialog.Title className="text-mauve12 m-0 text-2xl font-medium mb-5">
//                       Create a new page
//                     </Dialog.Title>
//                     <fieldset className="mb-[15px] flex items-center gap-5">
//                       <label className="text-violet11 w-[90px] text-right text-xl" htmlFor="title">
//                         Title
//                       </label>
//                       <input
//                         className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
//                         id="title"
//                         defaultValue="New Page"
//                         onChange={(event) => setTitle(event.target.value)}
//                       />
//                     </fieldset>
//                     <div className="mt-[25px] flex justify-end">
//                       <Dialog.Close asChild>
//                         <Button variant = "soft" onClick={createPage}>
//                           Create
//                         </Button>
//                       </Dialog.Close>
//                     </div>
//                     <Dialog.Close asChild>
//                       <button
//                         className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
//                         aria-label="Close"
//                       >
//                         <Cross2Icon />
//                       </button>
//                     </Dialog.Close>
//                   </Dialog.Content>
//                 </Dialog.Portal>
//             </Dialog.Root>
//             </div>
//             <div className="sm:w-[90vw] lg:w-2/3 h-[70vh] flex flex-col">
//                 <div>
//                     <ReactQuill
//                         theme="snow"
//                         value={content}
//                         onChange={setContent}
//                         className="bg-white text-black place-self-center"
//                         modules={modules} />
//                 </div>
//                 <Button variant = "soft" className = "mt-2" onClick={savePage} size = "4">Save</Button>
//             </div>
            
//         </div>
//     )
}