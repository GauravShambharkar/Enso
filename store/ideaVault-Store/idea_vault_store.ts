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
}

export const idea_Vault_store = create<ideaVault>((set) => ({
    vault: [],
    setVault: (data) => set((state) => ({ vault: [...state.vault, data] })),

}))


