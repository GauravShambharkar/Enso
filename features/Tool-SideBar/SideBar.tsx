"use client";

import React from "react";
import { Brain, Sparkle, Target, PanelLeft, PanelLeftClose } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

type SideBarProps = {
  isCollapsed: boolean;
  toggleCollapse: () => void;
};

const NAV = [
  { label: "Ikigai",       href: "/tools/ikigai",       icon: Sparkle },
  { label: "Idea Vault",   href: "/tools/idea-vault",   icon: Brain   },
  { label: "Eisen Matrix", href: "/tools/eisen-matrix", icon: Target  },
] as const;

export default function SideBar({ isCollapsed, toggleCollapse }: SideBarProps) {
  const path = usePathname();

  return (
    <aside
      style={{
        width: isCollapsed ? 52 : 216,
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
      }}
      className="fixed top-0 left-0 h-screen flex flex-col transition-[width] duration-150 ease-out z-40"
    >
      {/* Logo row */}
      <div
        className="flex items-center justify-between px-3 h-12"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {!isCollapsed && (
          <Link
            href="/"
            className="sekuya text-lg leading-none"
            style={{ color: "var(--accent-text)" }}
          >
            Enso
          </Link>
        )}
        <button
          onClick={toggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="cursor-pointer transition-colors duration-150"
          style={{ color: "var(--text-3)", marginLeft: isCollapsed ? "auto" : undefined }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
        >
          {isCollapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 flex flex-col gap-0.5">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className="relative flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors duration-100"
              style={{
                background: active ? "var(--surface-2)" : "transparent",
                color: active ? "var(--text-1)" : "var(--text-3)",
              }}
              onMouseEnter={e => {
                if (!active) e.currentTarget.style.color = "var(--text-2)";
              }}
              onMouseLeave={e => {
                if (!active) e.currentTarget.style.color = "var(--text-3)";
              }}
            >
              {/* Active left bar */}
              {active && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              )}
              <Icon
                className="size-4 flex-none stroke-[1.5]"
                style={{ color: active ? "var(--accent-text)" : undefined }}
              />
              {!isCollapsed && (
                <span className="text-sm" style={{ fontWeight: active ? 500 : 400 }}>
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div
        className="px-3 py-3 flex items-center gap-2.5"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <UserButton />
        {!isCollapsed && (
          <span className="text-xs" style={{ color: "var(--text-3)" }}>
            Account
          </span>
        )}
      </div>
    </aside>
  );
}
