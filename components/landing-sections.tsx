import type { ReactNode } from "react";

type ThemeProps = {
  isNight: boolean;
  children: ReactNode;
};

export function LandingCtaSection({ isNight, children }: ThemeProps) {
  return (
    <section
      className="bg-cover h-120 bg-center bg-no-repeat px-4 py-10 text-center md:py-14"
      style={{
        backgroundImage: `url('${isNight ? "/ensoCTANight.png" : "/ensoCTAday.png"}')`,
      }}
    >
      {children}
    </section>
  );
}

export function LandingFooterSection({ isNight, children }: ThemeProps) {
  return (
    <section
      className={`border-t px-6 py-16 text-center transition-colors duration-300  md:pb-5 ${isNight ? "border-white/10" : "border-[#0f2963]/8"}`}
      style={{
        backgroundImage: `linear-gradient(to top, ${isNight ? "rgba(3, 7, 18, 0.95)" : "rgba(252, 237, 217, 0.95)"} 0%, ${isNight ? "rgba(3, 7, 18, 0.3)" : "rgba(252, 237, 217, 0.3)"} 100%), url('${isNight ? "/footer@Night-clean.png" : "/footer@.png"}')`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </section>
  );
}
