"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Menu, X, Search, Sun, Moon, Languages, ChevronDown, Check } from "lucide-react";

const Navbar = () => {
    const t = useTranslations("Navbar");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const langDropdownRef = useRef<HTMLDivElement>(null);
    const colorPickerRef = useRef<HTMLDivElement>(null);

    const themeColors = [
        "#84b94e", "#fe9e0c", "#e93250", "#704fe6", "#07a0ae",
        "#6367ff", "#ff3e9b", "#bd3dea", "#2055e2", "#fcd535"
    ];

    const [primaryColor, setPrimaryColor] = useState("#704fe6");

    useEffect(() => {
        setMounted(true);
        const savedColor = localStorage.getItem("primary-color") || "#704fe6";
        const savedSecondary = localStorage.getItem("primary-secondary") || "#818cf8";
        setPrimaryColor(savedColor);
        document.documentElement.style.setProperty("--accent-color", savedColor);
        document.documentElement.style.setProperty("--accent-secondary", savedSecondary);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
                setIsLangDropdownOpen(false);
            }
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
                setIsColorPickerOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const updatePrimaryColor = (color: string) => {
        // Even deeper high-contrast secondary colors to ensure gradients never fade out
        const secondaryColors: Record<string, string> = {
            "#84b74e": "#2d5a1e", // Forest Green
            "#fe9e0c": "#a14e00", // Dark Burnt Orange
            "#e93250": "#8b0000", // Dark Maroon
            "#704fe6": "#2d1a6e", // Deep Royal Purple
            "#07a0ae": "#004d55", // Midnight Teal
            "#f54748": "#990b0b", // Blood Red
            "#6367ff": "#2d2f9d", // Deep Indigo
            "#ff3e9b": "#a60058", // Deep Pink
            "#a0fc02": "#4c7a00", // Deep Grass Green
            "#bd3dea": "#6b008d", // Deep Purple/Magenta
            "#2055e2": "#102a71", // Navy Blue
            "#fcd535": "#927902", // Dark Amber (for high-contrast yellow)
            "#84b94e": "#2d5a1e"  // Forest Green (Variation)
        };
        const secondary = secondaryColors[color] || color;

        setPrimaryColor(color);
        localStorage.setItem("primary-color", color);
        localStorage.setItem("primary-secondary", secondary);
        document.documentElement.style.setProperty("--accent-color", color);
        document.documentElement.style.setProperty("--accent-secondary", secondary);
        setIsColorPickerOpen(false);
    };

    const changeLanguage = (nextLocale: string) => {
        if (!pathname) return;

        const segments = pathname.split('/');
        // The first segment after '/' should be the locale if it's 'en' or 'bn'
        if (segments[1] === 'en' || segments[1] === 'bn') {
            segments[1] = nextLocale;
        } else {
            // If no locale prefix, add it
            segments.splice(1, 0, nextLocale);
        }

        const newPathname = segments.join('/') || `/${nextLocale}`;
        router.push(newPathname);
        setIsLangDropdownOpen(false);
    };

    const navLinks = [
        { name: t("product"), href: "#" },
        { name: t("learning"), href: `/${locale}/learning` },
        { name: t("solutions"), href: "#" },
        { name: t("pricing"), href: "#" },
    ];

    const languages = [
        { code: "en", name: "English", label: "ENG" },
        { code: "bn", name: "বাংলা", label: "BN" },
    ];

    if (!mounted) return null;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "py-4 glass border-b shadow-lg"
                : "py-6 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href={`/${locale}`} className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-linear-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20 group-hover:scale-110 transition-transform">
                        <Layers className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        Focus<span className="text-primary-600">Stack</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-all duration-300 relative group ${isActive ? "text-primary-600" : "text-muted-foreground hover:text-primary-600"
                                    }`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Language Dropdown */}
                    <div className="relative" ref={langDropdownRef}>
                        <button
                            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                            className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-muted-foreground hover:text-blue-600 hover:bg-muted/50 rounded-lg transition-all"
                        >
                            <Languages className="w-4.5 h-4.5" />
                            <span className="uppercase">{locale === 'en' ? 'ENG' : 'BN'}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {isLangDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-48 glass-card overflow-hidden z-50"
                                >
                                    <div className="p-1.5">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang.code)}
                                                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors ${locale === lang.code
                                                    ? "bg-primary-600 text-white font-bold"
                                                    : "text-muted-foreground hover:bg-muted"
                                                    }`}
                                            >
                                                <span>{lang.name}</span>
                                                {locale === lang.code && <Check className="w-4 h-4" />}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 text-muted-foreground hover:text-primary-600 transition-colors"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    <button className="px-5 py-2.5 text-sm font-semibold text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-all">
                        {t("signIn")}
                    </button>
                    <button className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-all shadow-md shadow-primary-600/20">
                        {t("getStarted")}
                    </button>

                    {/* Color Picker */}
                    <div className="relative ml-2" ref={colorPickerRef}>
                        <button
                            onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                            className="p-2 text-muted-foreground hover:text-primary-600 transition-colors"
                        >
                            <div className="w-5 h-5 rounded-full border border-border shadow-xs" style={{ backgroundColor: primaryColor }} />
                        </button>

                        <AnimatePresence>
                            {isColorPickerOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="absolute right-0 mt-3 p-3 glass-card w-48 z-50 overflow-hidden"
                                >
                                    <div className="grid grid-cols-5 gap-2">
                                        {themeColors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => updatePrimaryColor(color)}
                                                className={`w-7 h-7 rounded-md border-2 transition-all hover:scale-110 ${primaryColor === color ? "border-primary-600" : "border-transparent"}`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-muted-foreground"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2">
                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2">Select Language</div>
                                <div className="flex gap-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => changeLanguage(lang.code)}
                                            className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-bold rounded-xl transition-all ${locale === lang.code
                                                ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20"
                                                : "bg-muted text-foreground"
                                                }`}
                                        >
                                            <Languages className="w-4 h-4" /> {lang.name}
                                        </button>
                                    ))}
                                </div>

                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2">Theme Management</div>
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="w-full py-4 flex items-center justify-center gap-2 text-sm font-bold text-foreground bg-muted rounded-xl"
                                >
                                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                                </button>
                            </div>

                            <button className="w-full py-4 text-center font-semibold text-foreground bg-muted rounded-xl">
                                {t("signIn")}
                            </button>
                            <button className="w-full py-4 text-center font-semibold text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                                {t("getStarted")}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
