
import { PatientSelector } from "@/components/dashboard/PatientSelector";
import { VitalsChart } from "@/components/dashboard/VitalsChart";
import { useDashboard } from "@/hooks/useDashboard";
import { Activity, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LiveVitalsPage() {
    const { patients, selectedPatientId, setSelectedPatientId, vitals } = useDashboard();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight font-poppins">Live Vitals</h1>
                    <p className="text-slate-500 font-medium mt-1">Real-time patient monitoring</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl border border-emerald-100">
                    <Zap className="w-4 h-4 fill-emerald-600" />
                    <span className="text-sm font-bold">System Connected</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                            <Activity className="w-48 h-48 text-blue-600" />
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-black text-slate-900 font-poppins flex items-center gap-3 m-0">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
                                Select Patient
                            </h2>
                        </div>
                        <PatientSelector
                            patients={patients}
                            selectedId={selectedPatientId}
                            onSelect={setSelectedPatientId}
                        />
                    </div>

                    {selectedPatientId ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <VitalsChart
                                data={vitals}
                                type="heart_rate"
                                title="Heart Rate"
                                color="#0ea5e9"
                            />
                            <VitalsChart
                                data={vitals}
                                type="spo2"
                                title="O₂ Saturation"
                                color="#10b981"
                            />
                            <VitalsChart
                                data={vitals}
                                type="temperature"
                                title="Temperature"
                                color="#8b5cf6"
                            />
                            {/* Dummy Blood Pressure chart until added to schema */}
                            <VitalsChart
                                data={vitals}
                                type="heart_rate"
                                title="Blood Pressure"
                                color="#f43f5e"
                            />
                        </div>
                    ) : (
                        <div className="bg-slate-50 p-12 rounded-[32px] border border-slate-100 border-dashed flex flex-col items-center justify-center text-center">
                            <Activity className="w-12 h-12 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-900 mb-2">No Patient Selected</h3>
                            <p className="text-slate-500 text-sm max-w-sm">Select a patient from the list above to view their real-time vital signs and health metrics.</p>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-slate-900 font-poppins flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-rose-500 rounded-full" />
                                Live Alerts
                            </h2>
                            <Badge className="bg-rose-500 text-white border-none font-black px-2 py-0.5">2</Badge>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: "HR > 120 bpm (Critical)", time: "Just now", color: "bg-rose-500", patient: "John Doe" },
                                { label: "SpO2 < 92%", time: "5m ago", color: "bg-amber-500", patient: "Jane Smith" },
                            ].map((alert, i) => (
                                <div key={i} className="flex flex-col gap-2 p-4 rounded-2xl hover:bg-slate-50 border border-slate-100 group transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-3 h-3 rounded-full animate-pulse", alert.color)} />
                                            <p className="text-sm font-bold text-slate-900 leading-none">{alert.label}</p>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{alert.time}</p>
                                    </div>
                                    <div className="flex items-center justify-between pl-6">
                                        <p className="text-xs text-slate-500 font-medium">Patient: <span className="font-bold">{alert.patient}</span></p>
                                        <Button variant="ghost" size="sm" asChild className="h-6 text-[10px] uppercase font-bold text-blue-600 px-2">
                                            <Link to="/alerts">View</Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
