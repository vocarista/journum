'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { Save } from 'lucide-react'

const Editor = ({ params }: { params: { id: number } }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [aiFeedback, setAiFeedback] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/user/notebooks/pages/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch page')
      }
      const data = await response.json()
      console.log(data)
      setTitle(data.title)
      setContent(data.content)
      setAiFeedback(data.feedback || '')
      setCreatedAt(data.created_at)
      setUpdatedAt(data.updated_at)
    } catch (error) {
      console.error('Error fetching page:', error)
      toast({
        title: "Error",
        description: "Failed to load the page",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPage()
  }, [params.id])

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please add a title and some content",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch(`/api/user/notebooks/pages/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title, 
          content 
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiFeedback(data.feedback || '')
        setUpdatedAt(data.updated_at)
        toast({
          title: "Success",
          description: "Page saved successfully",
        })
      } else {
        throw new Error('Failed to save content')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      toast({
        title: "Error",
        description: "Failed to save the page",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl pt-8">
        <div className="bg-black">
          <div className="px-4 mb-2">
            <span 
              className="text-lg text-left underlineAnimation cursor-pointer" 
              onClick={() => router.back()}
            >
              {'\u2190'} Back
            </span>
          </div>

          <div className="p-4 flex items-center gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className="flex-1 bg-black text-white text-2xl font-bold placeholder-gray-600 focus:outline-none"
            />
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded p-2 hover:bg-gray-900"
              title="Save"
            >
              <Save className="h-6 w-6" />
            </button>
          </div>

          <div className="px-4 -mt-2 mb-4">
            <div className="text-sm text-gray-400">
              Created: {formatDate(createdAt)} • Updated: {formatDate(updatedAt)}
            </div>
          </div>

          <div className="px-4 mb-4">
            <div className="rounded-lg border border-blue-500/30 bg-gray-900/80 p-3">
              <div className="text-sm text-blue-400/80 mb-1">AI Feedback</div>
              <div className="text-gray-300 text-sm">
                {aiFeedback || "Summary not available right now. Save your content to generate a summary."}
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing..."
              className="w-full bg-black text-white min-h-[500px] resize-none focus:outline-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor