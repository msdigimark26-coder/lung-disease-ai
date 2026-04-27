import { useState } from "react";
import { Zap, CheckCircle2, Shield, Activity, Database, Cpu, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const FEATURES = [
    {
        title: "Real-time AI Processing",
        description: "Process X-ray scans instantly with under 200ms latency directly on the edge.",
        icon: Zap,
        color: "text-amber-500",
        bg: "bg-amber-50"
    },
    {
        title: "Unlimited Storage",
        description: "Store millions of high-resolution Dicom and PNG medical scans securely.",
        icon: Database,
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        title: "Advanced Grad-CAM Heatmaps",
        description: "Detailed visualization of pneumonia and opacity localizations in deep layers.",
        icon: Activity,
        color: "text-rose-500",
        bg: "bg-rose-50"
    },
    {
        title: "Hardware Acceleration",
        description: "Access our dedicated GPU clusters for batch processing thousands of records.",
        icon: Cpu,
        color: "text-emerald-500",
        bg: "bg-emerald-50"
    }
];

export default function UpgradePage() {
    const [isYearly, setIsYearly] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate a real-time payment gateway flow
        setTimeout(() => {
            setIsProcessing(false);
            alert("Payment Successful! Your account has been upgraded to the Advanced Diagnostics Pro Plan.");
            // In a real app, we would redirect to a success page or update the user context here
        }, 2500);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-12">
            
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto pt-8">
                <Badge className="bg-blue-50 text-blue-600 border-none font-black px-4 py-1.5 text-xs mb-6 tracking-widest uppercase">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Pro Plan
                </Badge>
                <h1 className="text-5xl font-black text-slate-900 tracking-tight font-poppins mb-6 leading-tight">
                    Upgrade to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Advanced Diagnostics</span>
                </h1>
                <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
                    Unlock real-time AI processing, predictive hardware scaling, and unlimited patient data tracking. Built for high-volume modern clinics.
                </p>
                
                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 bg-slate-50 p-2 rounded-2xl w-fit mx-auto border border-slate-200">
                    <button 
                        onClick={() => setIsYearly(false)}
                        className={cn("px-6 py-2.5 rounded-xl font-bold text-sm transition-all", !isYearly ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900")}
                    >
                        Monthly
                    </button>
                    <button 
                        onClick={() => setIsYearly(true)}
                        className={cn("px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2", isYearly ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-900")}
                    >
                        Yearly <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-md uppercase tracking-widest font-black">Save 20%</span>
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Free / Current Plan */}
                <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-xl font-black text-slate-900 mb-2">Basic Screening</h3>
                        <p className="text-slate-500 text-sm font-medium">Perfect for small clinics starting out.</p>
                    </div>
                    <div className="mb-8 flex items-baseline gap-2">
                        <span className="text-5xl font-black text-slate-900">₹0</span>
                        <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">/ forever</span>
                    </div>
                    <div className="space-y-4 mb-8 flex-1">
                        {['50 AI Scans per month', 'Basic binary classification', 'Standard email support', '7-day data retention'].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                                </div>
                                <span className="text-sm font-bold text-slate-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full h-14 rounded-2xl font-black text-slate-400 border-slate-200" disabled>
                        Current Plan
                    </Button>
                </div>

                {/* Pro Plan */}
                <div className="bg-slate-900 p-8 rounded-[40px] border border-slate-800 shadow-2xl flex flex-col relative overflow-hidden group">
                    <div className="absolute -right-20 -top-20 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Shield className="w-96 h-96 text-blue-500" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="mb-8">
                            <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
                                Advanced Diagnostics <Zap className="w-5 h-5 text-amber-400" />
                            </h3>
                            <p className="text-slate-400 text-sm font-medium">For high-throughput medical facilities.</p>
                        </div>
                        <div className="mb-8 flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white">₹{isYearly ? '14,999' : '19,999'}</span>
                            <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">/ month</span>
                        </div>
                        <div className="space-y-4 mb-8 flex-1">
                            {[
                                'Unlimited real-time AI scans',
                                'Grad-CAM deep layer heatmaps',
                                'Live IoT Vitals integration',
                                'Dedicated GPU processing',
                                '24/7 Priority clinical support',
                                'Unlimited HIPAA-compliant storage'
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-200">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <Button 
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full h-14 rounded-2xl font-black text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-900/50 flex items-center justify-center gap-2 transition-all relative overflow-hidden"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                    <Activity className="w-5 h-5 animate-spin" /> Processing Payment...
                                </>
                            ) : (
                                <>Upgrade Now <ArrowRight className="w-4 h-4" /></>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Real-time Features Grid */}
            <div className="pt-12">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-black text-slate-900 mb-3">Powering Next-Gen Hospitals</h2>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto">Everything you need to run a state-of-the-art diagnostic unit without worrying about infrastructure limits.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((feature, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-lg transition-shadow">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", feature.bg)}>
                                <feature.icon className={cn("w-6 h-6", feature.color)} />
                            </div>
                            <h4 className="text-lg font-black text-slate-900 mb-2">{feature.title}</h4>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
