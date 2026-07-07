import React, { useEffect, useState } from "react";
import {
  Brain,
  PanelLeftCloseIcon,
  PanelRightClose,
  Sparkle,
  Target,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

type prop = {
  isCollapsed: boolean;
  toggleCollapse: () => void;
};

const SideBar = ({ isCollapsed, toggleCollapse }: prop) => {
  const [isActive, setIsActive] = useState("Ikigai");
  const tools = [
    {
      name: "Ikigai",
      href: "/tools/ikigai",
      icon: <Sparkle className="size-4" />,
      color: "text-blue-300",
    },
    {
      name: "Idea Vault",
      href: "/tools/idea-vault",
      icon: <Brain className="size-4" />,
      color: "text-red-300",
    },
    {
      name: "Eisen Matrix",
      href: "/tools/eisen-matrix",
      icon: <Target className="size-4" />,
      color: "text-yellow-100",
    },
  ];

  const path = usePathname();
  useEffect(() => {
    if (path === "/tools/ikigai") {
      setIsActive("Ikigai");
    }
    if (path === "/tools/idea-vault") {
      setIsActive("Idea Vault");
    }
    if (path === "/tools/eisen-matrix") {
      setIsActive("Eisen Matrix");
    }
  }, [path]);

  return (
    <>
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } fixed top-0 left-0 h-screen transition-all ease-in-out duration-200 bg-black/50 backdrop-blur-md z-40 flex flex-col justify-between border-r border-white/5`}
      >
        {/* Main Nav Section */}
        <div className={`${isCollapsed ? "p-4" : "p-6"} flex-1 flex flex-col`}>
          {/* Logo Brand Title */}
          <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
            {!isCollapsed ? (
              <Link href="/" className="text-2xl text-[#977DD3] italic font-medium tracking-tighter sekuya">
                Enso
              </Link>
            ) : (
              <Link href="/" className="text-xl text-[#977DD3] italic font-semibold sekuya w-full text-center">
                E
              </Link>
            )}
          </div>

          {/* Tools Title & Collapse */}
          <div className="flex mb-6 items-center justify-between">
            {!isCollapsed ? (
              <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Tools</h2>
            ) : null}
            {isCollapsed ? (
              <PanelRightClose
                onClick={toggleCollapse}
                className="text-white w-full size-5 cursor-pointer stroke-1 hover:text-[#977DD3] transition-colors"
              />
            ) : (
              <PanelLeftCloseIcon
                onClick={toggleCollapse}
                className="text-white/60 hover:text-white size-5 cursor-pointer stroke-1 transition-colors"
              />
            )}
          </div>

          {/* Nav List */}
          <nav className="space-y-1.5 flex-1">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                onClick={() => {
                  setIsActive(tool.name);
                }}
                href={tool.href}
                className={`px-3 py-2 flex items-center rounded-md cursor-pointer hover:text-white hover:bg-white/5 transition-colors ${
                  isCollapsed ? "justify-center" : "gap-3"
                }`}
              >
                <span
                  className={`flex-none shrink-0 stroke-1 ${
                    tool.name === isActive
                      ? `${tool.color} animate-pulse`
                      : `${tool.color} opacity-40`
                  }`}
                >
                  {tool.icon}
                </span>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`text-sm font-medium ${
                      tool.name === isActive ? `${tool.color}` : "text-white/60"
                    }`}
                  >
                    {tool.name}
                  </motion.span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* User Profile Footer Section */}
        <div className={`${isCollapsed ? "p-4 justify-center" : "p-4"} border-t border-white/5 bg-black/25 flex items-center gap-3`}>
          <div className="flex-none shrink-0">
            <UserButton />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-white/90 truncate">Profile</span>
              <span className="text-[10px] text-white/45 truncate">Manage account</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
