"use client";
import React from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const CreatePageButton = ({ notebookId }: { notebookId: number }) => {
  const { toast } = useToast();
  const router = useRouter();

  async function createPage() {
    try {
      const response = await fetch('/api/user/notebooks/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'New Page',
          content: 'Start writing your thoughts here...',
          notebookId: notebookId
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data); // Debug log
        
        if (!data.id) {
          throw new Error('No page ID returned from server');
        }

        toast({
          title: "Page Created Successfully",
          description: "Your page was successfully created"
        });
        router.push(`/user/pages/${data.id}`);
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData); // Debug log
        throw new Error(errorData.error || 'Failed to create page');
      }
    } catch (error) {
      console.error('Error creating page:', error); // Debug log
      toast({
        title: "Oops! Something went wrong",
        description: "There was a problem creating your page",
        variant: "destructive"
      });
    }
  }

  return (
    <div>
      {/* Create Button */}
      <button
        onClick={createPage}
        className="min-w-[350px] min-h-[200px] rounded-2xl bg-blue-500 bg-opacity-20 flex justify-center items-center border border-blue-600 text-5xl sm:text-6xl text-blue-800 hover:bg-blue-950 hover:bg-opacity-100 transition-all duration-300 shadow-lg hover:text-white hover:scale-105"
      >
        +
      </button>
    </div>
  );
};

export default CreatePageButton;
