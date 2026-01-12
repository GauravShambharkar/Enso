'use client'
import { Button } from "@base-ui/react"
import { motion } from "framer-motion"
import { Edit2, Plus } from "lucide-react"

const idea_vault = () => {
    return (
        <div className="flex flex-col h-screen gap-2 ">
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
                className="w-full  text-white/70"
            >dashboards</motion.div>

            <div className="w-full h-full space-y-4">
                {/* create Button */}
                <div className="flex justify-end">
                    <span className="cursor-pointer hover:bg-white/10 transition-all ease-in-out duration-300 text-white flex items-center gap-2 border px-2 py-0.5 pr-3 rounded-lg bg-black/50 border-white/30 shadow-sm shadow-white/30" >
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

                        <tbody className="" >
                            <tr className="hover:bg-white/5">
                                <td className="border border-white/20 px-3 py-2">
                                    creating kreatorOS
                                </td>
                                <td className="border border-white/20 px-3 py-2">
                                    2023-01-01
                                </td>
                                <td className="border border-white/20 px-3 py-2">
                                    2023-01-01
                                </td>
                                <td className="border border-white/20 px-3 py-2">
                                    <span className="inline-flex cursor-pointer hover:bg-white/10 transition-all duration-300 text-white items-center gap-2 border px-2 py-0.5 rounded-lg bg-black/50 border-white/30 shadow-sm shadow-white/30">
                                        <Edit2 className="size-3" />
                                        Edit
                                    </span>
                                </td>
                            </tr>

                            {/* duplicate rows to test scroll */}
                            {Array.from({ length: 10 }).map((_, i) => (
                                <tr key={i} className="hover:bg-white/5 transition">
                                    <td className="border border-white/20 px-3 py-2">Idea {i + 2}</td>
                                    <td className="border border-white/20 px-3 py-2">2023-01-01</td>
                                    <td className="border border-white/20 px-3 py-2">2023-01-02</td>
                                    <td className="border border-white/20 px-3 py-2">
                                        <span className="inline-flex cursor-pointer hover:bg-white/10 transition-all duration-300 text-white items-center gap-2 border px-2 py-0.5 rounded-lg bg-black/50 border-white/30 shadow-sm shadow-white/30">
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
        </div>
    )
}

export default idea_vault