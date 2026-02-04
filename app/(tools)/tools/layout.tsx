"use client"
import React, { useEffect, useState } from 'react'
import SideBar from '@/features/Tool-SideBar/SideBar';



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

    


    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <SideBar toggleCollapse={toggleCollapse} isCollapsed={isCollapsed} />

            {/* Main Content */}
            <main className={`flex-1 h-screen mt-15  transition-all ease-in-out duration-200 ${isCollapsed ? "ml-25" : "ml-64"}`} >
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default layout