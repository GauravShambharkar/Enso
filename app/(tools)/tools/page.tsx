import React from "react";
import Link from "next/link";

const TOOLS = [
  { name: "Ikigai",       href: "/tools/ikigai",       desc: "Discover your reason for being." },
  { name: "Idea Vault",   href: "/tools/idea-vault",   desc: "Capture and develop ideas." },
  { name: "Eisen Matrix", href: "/tools/eisen-matrix", desc: "Prioritize tasks by urgency and importance." },
];

export default function ToolsPage() {
  return (
    <div style={{ padding: "32px 40px", maxWidth: 600 }}>
      <h1 style={{ fontSize: 28, fontWeight: 500, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 6 }}>
        Tools
      </h1>
      <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 32 }}>
        Select a tool to get started.
      </p>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {TOOLS.map(tool => (
          <Link
            key={tool.name}
            href={tool.href}
            style={{ display: "flex", alignItems: "baseline", gap: 40, padding: "18px 0", borderBottom: "1px solid var(--border)", textDecoration: "none" }}
          >
            <span style={{ fontSize: 14, color: "var(--text-1)", minWidth: 120, fontWeight: 450 }}>{tool.name}</span>
            <span style={{ fontSize: 13, color: "var(--text-3)" }}>{tool.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
