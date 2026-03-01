import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen transition-colors duration-300 relative">
            <div className="blob-center" />
            <Navbar />
            <div className="grow pt-24 pb-20">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;