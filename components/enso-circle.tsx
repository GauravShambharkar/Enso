"use client";

export function EnsoCircle({ className }: { className?: string }) {
    return (
        <div className={className}>
            <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <path
                    d="M100 20 C 144 20, 180 56, 180 100 C 180 144, 144 180, 100 180 C 56 180, 20 144, 20 100 C 20 70, 35 45, 60 30"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    style={{
                        filter: "blur(0.5px)",
                        opacity: 0.8,
                    }}
                />
                {/* Subtle inner shadow/secondary stroke for brush effect */}
                <path
                    d="M100 25 C 140 25, 175 60, 175 100 C 175 140, 140 175, 100 175 C 60 175, 25 140, 25 100 C 25 75, 40 50, 65 35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                        opacity: 0.3,
                    }}
                />
            </svg>
        </div>
    );
}
