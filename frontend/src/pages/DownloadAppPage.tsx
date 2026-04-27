import { useState, useEffect } from "react";
import { Monitor, Apple, Download, ShieldCheck, Terminal, HardDrive, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadAppPage() {
    const [isChecking, setIsChecking] = useState(true);
    const [version] = useState("v1.0.0");
    const [os, setOs] = useState<"mac" | "windows" | "linux" | "unknown">("unknown");

    useEffect(() => {
        // Detect OS
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.includes("mac")) setOs("mac");
        else if (userAgent.includes("win")) setOs("windows");
        else if (userAgent.includes("linux")) setOs("linux");
        
        // Simulate version check
        setTimeout(() => setIsChecking(false), 1500);
    }, []);

    const getOsIcon = () => {
        switch (os) {
            case "mac": return <Apple className="w-12 h-12" />;
            case "windows": return <Monitor className="w-12 h-12" />;
            case "linux": return <Terminal className="w-12 h-12" />;
            default: return <HardDrive className="w-12 h-12" />;
        }
    };

    const getOsName = () => {
        switch (os) {
            case "mac": return "macOS";
            case "windows": return "Windows";
            case "linux": return "Linux";
            default: return "Desktop";
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight font-poppins">Download Desktop App</h1>
                <p className="text-slate-500 font-medium mt-1">Get the native LungAI experience for your desktop with offline support.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Download Card */}
                <div className="col-span-1 lg:col-span-2">
                    <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-1 relative overflow-hidden shadow-2xl">
                        {/* Background effects */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>

                        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[22px] p-8 md:p-12 h-full relative z-10 border border-white/10">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20 text-white shadow-xl">
                                    {getOsIcon()}
                                </div>
                                <div className="text-center md:text-left flex-1 text-white">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-4">
                                        <ShieldCheck className="w-4 h-4" /> Recommended for your system
                                    </div>
                                    <h2 className="text-3xl font-bold mb-2">LungAI for {getOsName()}</h2>
                                    <p className="text-slate-300 mb-6 text-lg">Fast, secure, and fully integrated with your local hardware and AI models.</p>
                                    
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                        <a href="/static/downloads/LungAI-Desktop-Mac.dmg" download="LungAI-Desktop-Mac.dmg" className="w-full sm:w-auto">
                                            <Button className="w-full sm:w-auto h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-lg shadow-lg shadow-blue-900/50 transition-all hover:scale-105">
                                                <Download className="w-5 h-5 mr-2" />
                                                Download for {getOsName()}
                                            </Button>
                                        </a>
                                    </div>
                                    <div className="mt-4 text-sm text-slate-400 font-medium">
                                        {isChecking ? (
                                            <span className="flex items-center justify-center md:justify-start gap-2">
                                                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                                Checking for updates...
                                            </span>
                                        ) : (
                                            <span>Current Version: {version} — Released Today</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        {[
                            { title: "Native Performance", desc: "Runs directly on your machine with near-zero latency for AI processing." },
                            { title: "Offline Fallback", desc: "Access cached patient data and settings even when the server goes down." },
                            { title: "Hardware Integration", desc: "Direct secure access to connected medical devices and local file systems." },
                            { title: "Auto Updates", desc: "Stay up to date automatically with built-in seamless background updates." },
                        ].map((feat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">{feat.title}</h4>
                                    <p className="text-sm text-slate-500">{feat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Other Platforms */}
                <div className="col-span-1 space-y-4">
                    <h3 className="font-bold text-slate-900 mb-4 px-1">Other Platforms</h3>
                    
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <Apple className="w-6 h-6 text-slate-700" />
                                <div>
                                    <h5 className="font-bold text-slate-900">macOS (Apple Silicon)</h5>
                                    <p className="text-xs text-slate-500">.dmg • {version}</p>
                                </div>
                            </div>
                            <Download className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <Apple className="w-6 h-6 text-slate-700" />
                                <div>
                                    <h5 className="font-bold text-slate-900">macOS (Intel)</h5>
                                    <p className="text-xs text-slate-500">.dmg • {version}</p>
                                </div>
                            </div>
                            <Download className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <Monitor className="w-6 h-6 text-blue-600" />
                                <div>
                                    <h5 className="font-bold text-slate-900">Windows (x64)</h5>
                                    <p className="text-xs text-slate-500">.exe • {version}</p>
                                </div>
                            </div>
                            <Download className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <Terminal className="w-6 h-6 text-orange-500" />
                                <div>
                                    <h5 className="font-bold text-slate-900">Linux</h5>
                                    <p className="text-xs text-slate-500">.AppImage • {version}</p>
                                </div>
                            </div>
                            <Download className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
