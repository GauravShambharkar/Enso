"use client"
import React, { useEffect, useState } from 'react'
import SideBar from '@/features/Tool-SideBar/SideBar';
import Create_idea from '@/features/idea-vault/modal/Create_idea';
import { useIdeaVaultStore } from '@/store/ideaVault-Store/idea_vault_store';



const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(prev => {
            const newValue = !prev;
            localStorage.setItem("sideBar", String(newValue));
            return newValue;
        });
    };

    useEffect(() => {
        const sideBar = localStorage.getItem("sideBar");
        if (sideBar === "true") {
            setIsCollapsed(true);
        }
    }, []);
    const { createModal } = useIdeaVaultStore()




    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <SideBar toggleCollapse={toggleCollapse} isCollapsed={isCollapsed} />

            {/* Main Content */}
            <main className={`flex-1 h-screen mt-15  transition-all ease-in-out duration-200 ${isCollapsed ? "ml-25" : "ml-64"}`} >
                <div className="p-6 relative">
                    {children}
                    {createModal && <Create_idea/>}
                </div>
            </main>
        </div>
    )
}

export default layout