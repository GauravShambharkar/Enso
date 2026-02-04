import { Vault } from "lucide-react";
import { create } from "zustand";

type vaultType = {
    title: string,
    createOn: string,
    updatedOn: string,
}

interface ideaVault {
    vault: vaultType[]
    setVault: (data: vaultType) => void
    createModal: boolean
    setCreateModal: (data: boolean) => void
}

export const useIdeaVaultStore = create<ideaVault>((set) => ({
    vault: [],
    createModal: false,
    setCreateModal: (data: boolean) => set({ createModal: data }),
    setVault: (data) => set((state) => ({ vault: [...state.vault, data] })),

}))


