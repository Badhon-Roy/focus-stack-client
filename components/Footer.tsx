"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Layers, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
    const locale = useLocale();

    return (
        <footer className="pt-24 pb-12 font-sans transition-colors duration-300 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <Link href={`/${locale}`} className="flex items-center gap-3 mb-6 text-foreground group">
                            <div className="w-10 h-10 bg-linear-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20 group-hover:scale-110 transition-transform">
                                <Layers className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">FocusStack</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xs">
                            Empowering high-achievers to reclaim their time and achieve peak productivity through intelligent stacking.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Github, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="p-3 glass-card rounded-xl text-muted-foreground hover:text-primary-600 hover:scale-110">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-foreground font-bold mb-8 uppercase text-xs tracking-[0.2em]">Product</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground font-medium">
                            {["Features", "Integrations", "Pricing", "Enterprise"].map((item) => (
                                <li key={item}><Link href="#" className="hover:text-primary-600 transition-colors">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-foreground font-bold mb-8 uppercase text-xs tracking-[0.2em]">Company</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground font-medium">
                            {["About Us", "Careers", "Blog", "Contact"].map((item) => (
                                <li key={item}><Link href="#" className="hover:text-primary-600 transition-colors">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-foreground font-bold mb-8 uppercase text-xs tracking-[0.2em]">Weekly Insights</h4>
                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Join 10k+ achievers and get productivity tips every Monday.</p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="name@email.com"
                                className="w-full glass-input pr-24 py-4 text-sm focus:ring-primary-600/40"
                            />
                            <button className="absolute right-2 top-2 bottom-2 px-6 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 active:scale-95">
                                Join Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    <p>© 2024 FocusStack Inc. Designed for Peak Performance.</p>
                    <div className="flex gap-8">
                        {["Privacy", "Terms", "Cookies"].map((item) => (
                            <Link key={item} href="#" className="hover:text-foreground transition-colors">{item}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
