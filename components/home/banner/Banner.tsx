"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Rocket, Target, Zap, ArrowRight } from "lucide-react";

const Banner = () => {
    const t = useTranslations("Banner");
    const locale = useLocale();

    return (
        <section className="relative container h-[650px] flex items-center justify-center overflow-hidden glass-card mt-8 mx-auto">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 text-foreground">
                <Image
                    src="/banner-bg.png"
                    alt="Motivational Background"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105 opacity-10 dark:opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-background/40 via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full px-8 md:px-16 flex flex-col items-start text-foreground">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary-600/10 border border-primary-600/20"
                >
                    <Zap className="w-4 h-4 text-primary-600 fill-primary-600" />
                    <span className="text-sm font-medium tracking-wide uppercase text-primary-600">{t("badge")}</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold leading-tight mb-6"
                >
                    {t("title1")} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-primary-secondary">{t("focus")}</span>,<br />
                    {t("title2")} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-primary-secondary">{t("wins")}</span>.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
                >
                    {t("description")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-wrap gap-4"
                >
                    <Link href={`/${locale}/learning`}>
                        <button className="group relative px-8 py-4 bg-linear-to-br from-primary-600 to-primary-secondary text-white font-semibold rounded-xl overflow-hidden transition-all hover:brightness-110 flex items-center gap-2 shadow-lg shadow-primary-600/20 active:scale-95">
                            {t("ctaStarted")}
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </Link>

                    <button className="px-8 py-4 bg-muted border border-border text-foreground font-semibold rounded-xl hover:bg-muted/80 transition-all active:scale-95">
                        {t("ctaHow")}
                    </button>
                </motion.div>

                {/* Feature Icons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-16 flex gap-12 border-t border-border pt-8"
                >
                    <div className="flex flex-col gap-2">
                        <Rocket className="w-6 h-6 text-primary-600" />
                        <span className="text-xs text-muted-foreground uppercase tracking-tighter">{t("feat1")}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Target className="w-6 h-6 text-primary-600" />
                        <span className="text-xs text-muted-foreground uppercase tracking-tighter">{t("feat2")}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Zap className="w-6 h-6 text-primary-600" />
                        <span className="text-xs text-muted-foreground uppercase tracking-tighter">{t("feat3")}</span>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Blur Blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full z-0" />
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full z-0" />
        </section>
    );
};

export default Banner;
