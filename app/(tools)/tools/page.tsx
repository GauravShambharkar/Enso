import React from 'react'
import Link from 'next/link'

const tools = [
    {
        name: 'Ikigai',
        description: 'Discover your reason for being.',
        href: '/tools/ikigai',
        color: 'bg-blue-500/10 border-blue-500/20 text-blue-400'
    },
    {
        name: 'Idea Vault',
        description: 'Securely store and manage your creative ideas.',
        href: '/tools/idea-vault',
        color: 'bg-amber-500/10 border-amber-500/20 text-amber-400'
    },
    {
        name: 'Eisen Matrix',
        description: 'Prioritize tasks with the Eisenhower Matrix.',
        href: '/tools/eisen-matrix',
        color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
    },
]

const ToolsPage = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Tools</h1>
            <p className="text-white/60 mb-8">Select a tool to get started.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.name}
                        href={tool.href}
                        className={`bg-black/10 backdrop-blur-lg block p-6 rounded-xl border transition-all hover:scale-[1.02] hover:bg-opacity-20 ${tool.color}`}
                    >
                        <h3 className="text-xl  text-white font-thin mb-2">{tool.name}</h3>
                        <p className="text-sm opacity-80 text-white font-thin">{tool.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ToolsPage
