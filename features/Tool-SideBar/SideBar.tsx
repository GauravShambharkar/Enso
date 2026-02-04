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
import { useParams, usePathname } from "next/navigation";

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
      setIsActive("Ikigai")
    }
    if (path === "/tools/idea-vault") {
      setIsActive("Idea Vault")
    }
    if (path === "/tools/eisen-matrix") {
      setIsActive("Eisen Matrix")
    }

  }, [path])

  return (
    <>
      <aside
        className={`${isCollapsed ? "w-25" : "w-64"} fixed transition-all ease-in-out duration-200 mt-15 h-screen overflow-y-auto bg-black/50 backdrop-blur-md z-10`}
      >
        <div className="p-6">
          <div className="flex mb-6 items-center justify-between">
            {!isCollapsed ? (
              <h2 className="text-xl font-semibold text-white/80 ">Tools</h2>
            ) : null}
            {isCollapsed ? (
              <PanelRightClose
                onClick={toggleCollapse}
                className={`text-white ${isCollapsed && "w-full"} size-5 cursor-pointer stroke-1`}
              />
            ) : (
              <PanelLeftCloseIcon
                onClick={toggleCollapse}
                className={`text-white ${isCollapsed && "w-full"} size-5 cursor-pointer stroke-1`}
              />
            )}
          </div>
          <nav className="space-y-1 px-1">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                onClick={() => {
                  setIsActive(tool.name);
                }}
                href={tool.href}
                className={`px-3 ${isCollapsed && "py-2"} flex items-center gap-3 rounded-md cursor-pointer hover:text-white hover:bg-white/5 transition-colors`}
              >
                <span className={`stroke-1 ${tool.name === isActive ? `${tool.color} animate-pulse` : `${tool.color} opacity-40`}`} >{tool.icon}</span>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`py-2 text-sm font-medium ${tool.name === isActive ? `${tool.color} ` : `text-white/60`}`}
                  >
                    {tool.name}
                  </motion.span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
