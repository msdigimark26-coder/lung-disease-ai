import { useState } from "react";
import { User, Bell, Shield, Moon, Sun, Monitor, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight font-poppins">Settings</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage your account and system preferences</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 h-11 shadow-lg shadow-blue-200 gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Settings Sidebar */}
                <div className="md:col-span-3 space-y-2">
                    {[
                        { id: "profile", label: "Profile", icon: User },
                        { id: "notifications", label: "Notifications", icon: Bell },
                        { id: "system", label: "System Preferences", icon: Monitor },
                        { id: "security", label: "Security", icon: Shield },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                                activeTab === tab.id
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                            }`}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-white" : "text-slate-400"}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="md:col-span-9">
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 min-h-[500px]">
                        {activeTab === "profile" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 font-poppins mb-1">Profile Information</h2>
                                    <p className="text-sm text-slate-500 font-medium">Update your account details and public profile.</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-md overflow-hidden flex-shrink-0">
                                        <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=0284c7&color=fff&size=150" alt="Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-3">
                                        <Button variant="outline" className="rounded-xl font-bold border-slate-200 text-slate-700">Change Avatar</Button>
                                        <p className="text-xs text-slate-400 font-medium">JPG, GIF or PNG. 1MB max.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">First Name</label>
                                        <Input defaultValue="Sarah" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Last Name</label>
                                        <Input defaultValue="Johnson" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                                    </div>
                                    <div className="space-y-2 sm:col-span-2">
                                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                                        <Input defaultValue="sarah.johnson@lungai.med" type="email" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                                    </div>
                                    <div className="space-y-2 sm:col-span-2">
                                        <label className="text-sm font-bold text-slate-700">Role / Title</label>
                                        <Input defaultValue="Senior Radiologist" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "system" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 font-poppins mb-1">System Preferences</h2>
                                    <p className="text-sm text-slate-500 font-medium">Customize how LungAI looks and behaves.</p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 mb-3 block">Appearance</label>
                                        <div className="grid grid-cols-3 gap-4 max-w-md">
                                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-700">
                                                <Sun className="w-6 h-6" />
                                                <span className="text-xs font-bold">Light</span>
                                            </button>
                                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-slate-100 hover:border-slate-300 text-slate-500 transition-colors">
                                                <Moon className="w-6 h-6" />
                                                <span className="text-xs font-bold">Dark</span>
                                            </button>
                                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-slate-100 hover:border-slate-300 text-slate-500 transition-colors">
                                                <Monitor className="w-6 h-6" />
                                                <span className="text-xs font-bold">System</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100 space-y-4">
                                        <h3 className="text-sm font-bold text-slate-700">AI Configuration</h3>
                                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div>
                                                <p className="font-bold text-slate-900">High Sensitivity Mode</p>
                                                <p className="text-xs text-slate-500">Flags potential issues with lower confidence threshold.</p>
                                            </div>
                                            <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div>
                                                <p className="font-bold text-slate-900">Auto-Generate PDF Reports</p>
                                                <p className="text-xs text-slate-500">Create PDF immediately after AI analysis completes.</p>
                                            </div>
                                            <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(activeTab === "notifications" || activeTab === "security") && (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20 text-slate-400 animate-in fade-in">
                                <Monitor className="w-16 h-16 mb-4 opacity-20" />
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Coming Soon</h3>
                                <p className="text-sm max-w-sm">This settings section is currently under development.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
