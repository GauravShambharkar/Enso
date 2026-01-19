import { create } from "zustand";

interface StoreType {
    todo: string,
    setTodo: (title: string) => void
}

export const appStore = create<StoreType>((set) => ({
    todo: "",
    setTodo: (title) => set({ todo: title })
}))