import React from 'react'
import Link from 'next/link'

const tools = [
    { name: 'Ikigai', href: '/tools/ikigai' },
    { name: 'Idea Vault', href: '/tools/idea-vault' },
    { name: 'Eisen Matrix', href: '/tools/eisen-matrix' },
]

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 fixed top-15 h-full  overflow-y-auto bg-black/50 backdrop-blur-md z-10 transition-transform duration-300">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-6 text-white/80 px-2 ">Tools</h2>
                    <nav className="space-y-1">
                        {tools.map((tool) => (
                            <Link
                                key={tool.name}
                                href={tool.href}
                                className="block px-3 py-2 rounded-md text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                {tool.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="w-full h-screen mt-15  ml-64">
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default layout