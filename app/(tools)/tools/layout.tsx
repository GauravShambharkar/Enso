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
        <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>
            <SideBar toggleCollapse={toggleCollapse} isCollapsed={isCollapsed} />
            <main
                className={`flex-1 min-w-0 transition-[margin] duration-150 ease-out ml-0 pt-12 md:pt-0 pb-14 md:pb-0 ${isCollapsed ? "md:ml-[52px]" : "md:ml-[216px]"}`}
                style={{ minHeight: "100vh" }}
            >
                {children}
            </main>
        </div>
    )
}

export default layout