"use client"
import React, { useState } from 'react';
import styles from "./notebook.module.css";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Notebook = (props: any) => {
  const router = useRouter();
  const { title, description, id} = props;

  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className={`min-w-[350px] min-h-[200px] bg-gradient-to-br from-amber-50 to-amber-200 rounded-2xl shadow-xl shadow-zinc-700  p-3 relative overflow-hidden hover:shadow-xl hover:shadow-zinc-600 hover:scale-105 transition-transform duration-300`}
      onMouseEnter={() => setShowMore(true)}
      onMouseLeave={() => setShowMore(false)}
    >
      <div title={title} className={`text-black text-3xl font-bold`}>
        {title.length > 60 ? title.substring(0, 60) + "..." : title}
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 bg-zinc-900 transition-transform duration-300 ease-in-out shadow-md shadow-white ${
          showMore ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className={`p-4`}>
          <p className={`text-amber-50 text-lg`}>{description}</p>
          <div className={`flex justify-end gap-2 mt-2`}>
            <div className = "flex justify-evenly w-full mt-4">
              <Link href={`/user/notebooks/${id}`} className={`${styles.underlineAnimation} text-white`}>Open &#x2197;</Link>
              <Link href={`/user/notebooks/options/${id}`} className={`${styles.underlineAnimation} text-white`} >&#9881; Options</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notebook;