import Link from "next/link";
import { EnsoCircle } from "./enso-circle";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-12 md:py-16">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            {/* Small logo placeholder */}
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded-full" />
                            </div>
                            <span className="text-xl font-light tracking-tighter text-white">
                                Enso
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Find your purpose. <br />
                            Align your life.
                        </p>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="font-medium text-white mb-4">Product</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="/features" className="hover:text-white transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="hover:text-white transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="font-medium text-white mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="/blog" className="hover:text-white transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/community" className="hover:text-white transition-colors">
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="hover:text-white transition-colors">
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h4 className="font-medium text-white mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-4 text-xs text-muted-foreground/60">
                    <p>© {new Date().getFullYear()} Enso Inc. All rights reserved.</p>
                    <div className="w-full flex justify-center">
                        <h1 style={
                            {
                                fontFamily: "bbh",
                                fontWeight: "normal",
                                fontSize: "12rem",
                            }
                        } className="text-9xl text-violet-400" >ENSO</h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <span>Designed with intention.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
