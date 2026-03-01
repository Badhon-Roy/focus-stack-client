"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Lightbulb, PlayCircle, Star, TrendingUp } from "lucide-react";

const LearningContent = () => {
    // Assuming you'll add 'Learning' to your translations soon. 
    // For now, let's use some fallback text and the Navbar keys if they fit.
    const t = useTranslations("Navbar");

    const categories = [
        { icon: PlayCircle, label: "Video Courses", count: "12 Courses", color: "text-primary-600", bg: "bg-primary-600/10" },
        { icon: BookOpen, label: "E-Books & Guides", count: "45 Resources", color: "text-primary-600", bg: "bg-primary-600/10" },
        { icon: Star, label: "Workshops", count: "8 Live Sessions", color: "text-primary-600", bg: "bg-primary-600/10" },
    ];

    const popularLessons = [
        { title: "Mastering the Flow State", tag: "Mindset", duration: "18m", level: "Beginner", rating: 4.9 },
        { title: "Strategic Task Stacking", tag: "Strategy", duration: "24m", level: "Intermediate", rating: 4.8 },
        { title: "Psychology of Focus", tag: "Science", duration: "32m", level: "Advanced", rating: 4.9 },
    ];

    return (
        <div className="container mx-auto py-12 px-6 lg:px-12">
            {/* Header Section */}
            <header className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-2 mb-4 text-blue-600 font-semibold tracking-wider uppercase text-sm justify-center lg:justify-start"
                    >
                        <GraduationCap className="w-5 h-5 transition-transform hover:scale-110" />
                        <span>Empower Your Growth</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black mb-6 leading-tight"
                    >
                        Elevate Your Skills with <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-600 via-primary-600 to-primary-secondary">Focus Learning</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-muted-foreground leading-relaxed"
                    >
                        Unlock exclusive resources, expert-led workshops, and curated content designed to help you master productivity and reclaim your time.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-center gap-4 bg-muted px-6 py-4 rounded-2xl border border-border"
                >
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">12.4k+</span>
                        <span className="text-sm text-muted-foreground tracking-tight">Active Scholars</span>
                    </div>
                    <div className="h-10 w-px bg-border mx-2" />
                    <div className="flex -space-x-3 overflow-hidden">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex h-8 w-8 rounded-full ring-2 ring-background bg-muted border border-border items-center justify-center text-[10px] font-bold">
                                FC
                            </div>
                        ))}
                    </div>
                </motion.div>
            </header>

            {/* Categories Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                {categories.map((cat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                        whileHover={{ y: -8 }}
                        className="p-8 glass-card group"
                    >
                        <div className={`w-14 h-14 ${cat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <cat.icon className={`w-7 h-7 ${cat.color}`} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{cat.label}</h3>
                        <p className="text-muted-foreground text-sm font-medium">{cat.count}</p>
                    </motion.div>
                ))}
            </div>

            {/* Popular Lessons / Content Area */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-primary-600" />
                        Trending Lessons
                    </h2>
                    <button className="text-sm font-semibold text-primary-600 hover:underline">View All</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularLessons.map((lesson, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                            className="glass-card shadow-none overflow-hidden hover:border-blue-500/30"
                        >
                            <div className="h-48 bg-white/5 relative flex items-center justify-center group">
                                <Lightbulb className="w-12 h-12 text-muted-foreground/30 group-hover:text-primary-600/40 transition-colors" />
                                <div className="absolute top-4 left-4 px-3 py-1 glass backdrop-blur-sm rounded-lg text-xs font-bold uppercase tracking-wider">
                                    {lesson.tag}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-1 mb-2">
                                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                                    <span className="text-sm font-bold text-foreground/80">{lesson.rating}</span>
                                    <span className="text-xs text-muted-foreground ml-1">Excellent</span>
                                </div>
                                <h4 className="text-lg font-bold mb-4 line-clamp-1">{lesson.title}</h4>
                                <div className="flex items-center justify-between text-xs font-medium text-muted-foreground border-t border-white/10 pt-4">
                                    <span className="flex items-center gap-1"><PlayCircle className="w-3.5 h-3.5" /> {lesson.duration}</span>
                                    <span className="px-2 py-0.5 glass rounded-md">{lesson.level}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningContent;

