import { create } from 'zustand'

export type EditorState = {
    notebookId: number,
    user_email: string,
    pageId: number
}

export type EditorActions = {
    setNotebookId: (notebook_id: number) => void,
    setUserEmail: (user_email: string) => void,
    setPageId: (page_id: number) => void
}

export type EditorStore = EditorState & EditorActions

export const defaultInitState: EditorState = {
    notebookId: 0,
    user_email: '',
    pageId: 0
}

export const useEditorStore = create<EditorStore>((set) => ({
    ...defaultInitState,
    setNotebookId: (notebook_id: number) => set((state) => ({...state, notebook_id: notebook_id})),
    setUserEmail: (user_email: string) => set((state) => ({...state, user_email: user_email})),
    setPageId: (page_id: number) => set((state) => ({...state, page_id: page_id}))
}))