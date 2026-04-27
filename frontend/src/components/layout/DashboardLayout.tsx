import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { useEffect } from "react";

export function DashboardLayout() {
    const location = useLocation();

    // Map route paths to page titles
    useEffect(() => {
        const titles: Record<string, string> = {
            "/doctor": "Doctor Portal | LungAI — AI-Powered Lung Disease Detection",
            "/vitals": "Live Vitals | LungAI",
            "/analysis": "AI Analysis | LungAI",
            "/patients": "Patients | LungAI",
            "/settings": "Settings | LungAI",
        };
        document.title = titles[location.pathname] || "LungAI";
    }, [location.pathname]);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-inter">
            <Sidebar className="w-80 hidden lg:flex" />

            <div className="flex-1 flex flex-col overflow-hidden relative">
                <Header />

                <main className="flex-1 overflow-y-auto p-8 pt-6 relative">
                    {/* Animated Background Gradients */}
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] -z-10 animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-100/20 rounded-full blur-[120px] -z-10" />

                    <Outlet />
                </main>
            </div>
            
            <ChatbotWidget />
        </div>
    );
}
