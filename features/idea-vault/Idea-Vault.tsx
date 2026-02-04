"use client"

import { motion } from "framer-motion"
import { Edit2, Eye, Plus } from "lucide-react"
import View_idea from "./modal/View_idea"
import { useState } from "react"
import { ideas, Idea } from "@/utils/ideas"
import Create_idea from "./modal/Create_idea"
import { useIdeaVaultStore } from "@/store/ideaVault-Store/idea_vault_store"

const Idea_Vault = () => {
    const [viewModal, setViewModal] = useState(false)
    const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)
    const { setCreateModal } = useIdeaVaultStore()

    const handleViewIdea = (idea: Idea) => {
        setSelectedIdea(idea)
        setViewModal(true)
    }

    const closeViewModal = () => {
        setViewModal(false)
        setSelectedIdea(null)
    }


    return (
        <>
            <div className="flex flex-col h-screen gap-2 relative">
                <div className="w-full ">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='text-4xl font-medium text-white'
                    >Idea-Vault</motion.h1>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="w-full text-white/70"
                >dashboards</motion.div>

                <div className="w-full h-full space-y-4">
                    {/* create Button */}
                    <div className="flex justify-end">
                        <span onClick={() => setCreateModal(true)} className="cursor-pointer hover:bg-white/10 transition-all ease-in-out duration-300 text-white flex items-center gap-2 border px-2 py-0.5 pr-3 rounded-lg bg-black/50 border-white/30 shadow-sm shadow-white/30" >
                            <Plus className="size-4" />
                            Create
                        </span>
                    </div>

                    {/* listing ideas */}
                    <div className="w-full border border-white/20 bg-white/10 backdrop-blur-xl rounded-lg overflow-hidden max-h-120 overflow-y-auto">
                        <table className="w-full table-fixed border-collapse text-white ">
                            <thead className="sticky top-0 left-0 right-0 z-10 bg-black">
                                <tr>
                                    <th className="border border-white/20 px-3 rounded-tl-lg py-2 text-left font-thin">Title</th>
                                    <th className="border border-white/20 px-3 py-2 text-left font-thin">Created On</th>
                                    <th className="border border-white/20 px-3 py-2 text-left font-thin">Updated On</th>
                                    <th className="border border-white/20 px-3 py-2 text-left font-thin">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {ideas.map((item) => (
                                    <tr key={item.id} className="hover:bg-white/5 transition group">
                                        <td className="border border-white/20 px-3 py-2">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="truncate text-sm">{item.idea}</span>
                                                <Eye
                                                    className={`size-4 stroke-1 transition-all ease-in-out duration-300 hover:stroke-2 hover:scale-110 cursor-pointer  hover:text-white ${viewModal && item.id === selectedIdea?.id ? "text-green-400" : "text-white/50"}`}
                                                    onClick={() => {
                                                        handleViewIdea(item)
                                                        if (item.id === selectedIdea?.id) {
                                                            setViewModal(!viewModal)
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td className="border border-white/20 px-3 py-2 text-white/60 text-sm">
                                            {item.createdOn}
                                        </td>
                                        <td className="border border-white/20 px-3 py-2 text-white/60 text-sm">
                                            {item.updatedOn}
                                        </td>
                                        <td className="border border-white/20 px-3 py-2">
                                            <span className="inline-flex cursor-pointer hover:bg-white/10 transition-all duration-300 text-sm text-white items-center gap-2 border px-2 py-0.5 rounded-md bg-black/50 border-white/30 shadow-xs shadow-white/30">
                                                <Edit2 className="size-3" />
                                                Edit
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {viewModal && <View_idea
                    onClose={closeViewModal}
                    idea={selectedIdea}
                />}


            </div>
        </>
    )
}

export default Idea_Vault