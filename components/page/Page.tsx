"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from "./page.module.css"; 

const Page = (props: any) => {
  const router = useRouter();
  const { title, id } = props;
  const [showMore, setShowMore] = useState(false);

  const handleDelete = async () => {
    const response = await fetch(`/api/user/notebooks/pages/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <div
      className={`min-w-[350px] min-h-[200px] bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 rounded-2xl shadow-md shadow-zinc-700 p-4 relative overflow-hidden hover:shadow-lg hover:shadow-zinc-700 hover:scale-105 transition-transform duration-300`}
      onMouseEnter={() => setShowMore(true)}
      onMouseLeave={() => setShowMore(false)}
    >
      <div title={title} className={`text-gray-800 text-4xl font-semibold`}>
        {title.length > 50 ? title.substring(0, 50) + "..." : title}
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 bg-blue-950 transition-transform duration-300 ease-in-out shadow-md shadow-gray-300 ${
          showMore ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className={`p-4`}>
          <div className={`flex justify-between gap-4 mt-4`}>
            <Link href={`/user/pages/${id}`} className={`${styles.linkAnimation} text-white`}>
              Open &#x2197;
            </Link>
            <span onClick={handleDelete} className={`underlineAnimationRed text-white hover:cursor-pointer`}>
              &#9881; Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
