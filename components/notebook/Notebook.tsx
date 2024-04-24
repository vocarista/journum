"use client"
import React from 'react';
import styles from "./notebook.module.css";
import deleteIcon from '@/public/delete.png';
import Image from 'next/image';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const Notebook = (props: any) => {
  const router = useRouter();

  const { title, description, editMode, id } = props;

  const handleDelete =  () => {
    async function deleteNotebook() {
      const res = await fetch('/api/user/notebooks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id}),
      })
      if (res.ok) {
        window.alert('Notebook deleted successfully');
      } else {
        window.alert('Failed to delete notebook');
      }
    }
    deleteNotebook();
  }

  return (
    <div className={styles.container} onClick = {() => {
      if (!editMode) {
        localStorage.setItem('notebookId', id);
        router.push('/user/notebooks/editor');
      }
    }}>
		<div className={styles.book}>
			<div className={styles.front}>
				<div className={styles.cover}>
					<h1 className = "text-center mt-10 font-bold text-4xl mx-4 flex-grow">{title}</h1>
          <p className = "text-center mt-10 mx-5">{description}</p>
          <div className = "place-items-center flex flex-col mt-20">
            {!editMode && <Button onClick={handleDelete} variant = "ghost" className = "place-self-end">
                <Image src = {deleteIcon} height = {30} alt = "delete" />
              </Button>}
          </div>
				</div>
			</div>
		</div>
	</div>
  );
};

export default Notebook;