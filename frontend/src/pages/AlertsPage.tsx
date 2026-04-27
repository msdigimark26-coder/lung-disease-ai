import { useState } from "react";
import { AlertCircle, Activity, CheckCircle2, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const INITIAL_ALERTS = [
    {
        id: 1,
        type: "critical",
        patient: "John Doe",
        patientId: 1,
        metric: "Heart Rate",
        value: "125 bpm",
        threshold: "> 120 bpm",
        time: "Just now",
        status: "active",
        description: "Patient's heart rate has exceeded the critical threshold of 120 bpm for more than 5 minutes."
    },
    {
        id: 2,
        type: "warning",
        patient: "Jane Smith",
        patientId: 2,
        metric: "SpO2",
        value: "91%",
        threshold: "< 92%",
        time: "5m ago",
        status: "active",
        description: "Oxygen saturation dropped below 92%. Monitoring closely."
    },
    {
        id: 3,
        type: "resolved",
        patient: "Robert Johnson",
        patientId: 3,
        metric: "Temperature",
        value: "37.5°C",
        threshold: "> 38.0°C",
        time: "1h ago",
        status: "resolved",
        description: "Fever has subsided after medication."
    },
    {
        id: 4,
        type: "critical",
        patient: "Sarah Williams",
        patientId: 4,
        metric: "Blood Pressure",
        value: "180/110",
        threshold: "> 160/100",
        time: "2h ago",
        status: "active",
        description: "Hypertensive crisis detected. Immediate intervention required."
    }
];

export default function AlertsPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [alerts, setAlerts] = useState(INITIAL_ALERTS);

    const handleAcknowledge = (id: number) => {
        setAlerts(prev => prev.map(alert => 
            alert.id === id ? { ...alert, status: "resolved" } : alert
        ));
    };

    const filteredAlerts = alerts.filter(alert => {
        const matchesSearch = alert.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              alert.metric.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || alert.status === filter || alert.type === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Link to="/vitals">
                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 -ml-3 h-8">
                                <ArrowLeft className="w-4 h-4 mr-1" /> Back
                            </Button>
                        </Link>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight font-poppins">System Alerts</h1>
                    <p className="text-slate-500 font-medium mt-1">Comprehensive view of all patient vital alerts</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge className="bg-rose-500 text-white border-none font-black px-3 py-1 text-sm shadow-sm shadow-rose-200">
                        {alerts.filter(a => a.type === 'critical' && a.status === 'active').length} Critical
                    </Badge>
                    <Badge className="bg-amber-500 text-white border-none font-black px-3 py-1 text-sm shadow-sm shadow-amber-200">
                        {alerts.filter(a => a.type === 'warning' && a.status === 'active').length} Warning
                    </Badge>
                </div>
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search by patient or metric..."
                            className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus-visible:ring-blue-500 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                        <Button 
                            variant={filter === "all" ? "default" : "outline"} 
                            className={cn("rounded-xl font-bold", filter === "all" ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-white text-slate-600")}
                            onClick={() => setFilter("all")}
                        >
                            All Alerts
                        </Button>
                        <Button 
                            variant={filter === "critical" ? "default" : "outline"} 
                            className={cn("rounded-xl font-bold", filter === "critical" ? "bg-rose-500 text-white hover:bg-rose-600 border-rose-500" : "bg-white text-slate-600")}
                            onClick={() => setFilter("critical")}
                        >
                            Critical
                        </Button>
                        <Button 
                            variant={filter === "active" ? "default" : "outline"} 
                            className={cn("rounded-xl font-bold", filter === "active" ? "bg-amber-500 text-white hover:bg-amber-600 border-amber-500" : "bg-white text-slate-600")}
                            onClick={() => setFilter("active")}
                        >
                            Active
                        </Button>
                        <Button 
                            variant={filter === "resolved" ? "default" : "outline"} 
                            className={cn("rounded-xl font-bold", filter === "resolved" ? "bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-500" : "bg-white text-slate-600")}
                            onClick={() => setFilter("resolved")}
                        >
                            Resolved
                        </Button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 gap-4">
                        {filteredAlerts.map((alert) => (
                            <div key={alert.id} className={cn(
                                "flex flex-col md:flex-row gap-6 p-6 rounded-3xl border transition-all hover:shadow-md",
                                alert.status === "resolved" ? "bg-slate-50 border-slate-200 opacity-70" :
                                alert.type === "critical" ? "bg-rose-50/30 border-rose-100" : "bg-amber-50/30 border-amber-100"
                            )}>
                                <div className="flex items-start gap-4 flex-1">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm",
                                        alert.status === "resolved" ? "bg-slate-200 text-slate-500" :
                                        alert.type === "critical" ? "bg-rose-500 text-white shadow-rose-200" : "bg-amber-500 text-white shadow-amber-200"
                                    )}>
                                        {alert.status === "resolved" ? <CheckCircle2 className="w-6 h-6" /> : 
                                         alert.type === "critical" ? <AlertCircle className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-black text-slate-900 font-poppins">{alert.metric} Alert</h3>
                                            <Badge variant="outline" className={cn(
                                                "uppercase tracking-widest text-[10px] font-bold border",
                                                alert.type === "critical" ? "border-rose-200 text-rose-600 bg-rose-50" :
                                                alert.type === "warning" ? "border-amber-200 text-amber-600 bg-amber-50" :
                                                "border-slate-200 text-slate-500 bg-slate-100"
                                            )}>
                                                {alert.type}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-slate-600 font-medium mb-3">{alert.description}</p>
                                        
                                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
                                            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                                                <span className="uppercase tracking-widest text-slate-400">Patient:</span>
                                                <span className="text-slate-900">{alert.patient}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                                                <span className="uppercase tracking-widest text-slate-400">Value:</span>
                                                <span className={cn("text-slate-900", alert.status !== "resolved" && "text-rose-600")}>{alert.value}</span>
                                                <span className="text-slate-400">/ {alert.threshold}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-200/60 pt-4 md:pt-0 md:pl-6">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 md:mb-0">{alert.time}</span>
                                    {alert.status !== "resolved" && (
                                        <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                                            <Button 
                                                variant="outline" 
                                                onClick={() => handleAcknowledge(alert.id)}
                                                className="flex-1 md:flex-none bg-white font-bold rounded-xl text-slate-600"
                                            >
                                                Acknowledge
                                            </Button>
                                            <Button 
                                                onClick={() => navigate(`/patient/${alert.patientId}`)}
                                                className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                                            >
                                                View Patient
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        {filteredAlerts.length === 0 && (
                            <div className="py-16 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-slate-900 mb-1">No alerts found</h3>
                                <p className="text-slate-500 text-sm">There are no alerts matching your current filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
