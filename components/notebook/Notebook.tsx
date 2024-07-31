"use client"
import React, { useState } from 'react';
import styles from "./notebook.module.css";
import deleteIcon from '@/public/delete.png';
import Image from 'next/image';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// const Notebook = (props: any) => {
//   const router = useRouter();

//   const { title, description, editMode, id, handleDelete } = props;

//   return (
//     <div className={styles.container} onClick = {() => {
//       if (!editMode) {
//         localStorage.setItem('notebookId', id);
//         router.push('/user/notebooks/editor');
//       }
//     }}>
// 		<div className={styles.book}>
// 			<div className={styles.front}>
// 				<div className={styles.cover}>
// 					<h1 className = "text-center mt-10 font-bold text-4xl mx-4 flex-grow">{title}</h1>
//           <p className = "text-center mt-10 mx-5">{description}</p>
//           <div className = "place-items-center flex flex-col mt-20">
//             {!editMode && <Button onClick={(event) => {
//               event.stopPropagation();
//               handleDelete(id);
//             }} variant = "ghost" className = "place-self-end">
//                 <Image src = {deleteIcon} height = {30} alt = "delete" />
//               </Button>}
//           </div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
//   );
// };

const Notebook = (props: any) => {
  const router = useRouter();
  const { title, description, editMode, id, handleDelete } = props;

  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className={`w-full min-h-[200px] bg-amber-50 rounded-2xl shadow-xl shadow-gray-700 p-3 relative overflow-hidden`}
      onMouseEnter={() => setShowMore(true)}
      onMouseLeave={() => setShowMore(false)}
    >
      <div title={title} className={`text-black text-3xl font-bold`}>
        {title.length > 60 ? title.substring(0, 60) + "..." : title}
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gray-900 transition-transform duration-300 ease-in-out shadow-md shadow-white ${
          showMore ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className={`p-4`}>
          <p className={`text-amber-50 text-lg`}>{description}</p>
          <div className={`flex justify-end gap-2 mt-2`}>
            <div className = "flex justify-evenly w-full mt-4">
              <Link href={`/user/notebooks/editor/${id}`} className={`${styles.underlineAnimation} text-white`}>Open &#x2197;</Link>
              <Link href={`/user/notebooks/options/${id}`} className={`${styles.underlineAnimation} text-white`} >&#9881; Options</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notebook;