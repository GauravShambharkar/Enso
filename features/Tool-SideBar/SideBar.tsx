import React from 'react'
import { Brain, PanelLeftCloseIcon, PanelRightClose, Sparkle, Target } from 'lucide-react'
import Link from 'next/link'
import { motion } from "framer-motion"


type prop = {
    isCollapsed: boolean,
    toggleCollapse: () => void
}

const SideBar = ({ isCollapsed, toggleCollapse }: prop) => {

    const tools = [
        { name: 'Ikigai', href: '/tools/ikigai', icon: <Sparkle className='stroke-1  size-5 text-blue-300' /> },
        { name: 'Idea Vault', href: '/tools/idea-vault', icon: <Brain className='stroke-1  size-5 text-red-300' /> },
        { name: 'Eisen Matrix', href: '/tools/eisen-matrix', icon: <Target className='stroke-1  size-5 text-yellow-100' /> },
    ]

    return (
        <>
            <aside className={`${isCollapsed ? "w-25" : "w-64"} fixed transition-all ease-in-out duration-200 mt-15 h-screen overflow-y-auto bg-black/50 backdrop-blur-md z-10`}>
                <div className="p-6">
                    <div className="flex mb-6 items-center justify-between">
                        {!isCollapsed ? <h2 className="text-xl font-semibold text-white/80 ">Tools</h2> : null}
                        {isCollapsed ? <PanelRightClose onClick={toggleCollapse} className={`text-white ${isCollapsed && "w-full"} size-5 cursor-pointer stroke-1`} /> : <PanelLeftCloseIcon onClick={toggleCollapse} className={`text-white ${isCollapsed && "w-full"} size-5 cursor-pointer stroke-1`} />}
                    </div>
                    <nav className="space-y-1 px-1">
                        {tools.map((tool) => (
                            <Link key={tool.name} href={tool.href} className={`px-3 ${isCollapsed && "py-2"} flex items-center gap-3 rounded-md cursor-pointer hover:text-white hover:bg-white/5 transition-colors`}>
                                <span>
                                    {tool.icon}
                                </span>
                                {!isCollapsed && <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="py-2 text-sm font-medium text-white/60 "
                                >
                                    {tool.name}
                                </motion.span>}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default SideBar