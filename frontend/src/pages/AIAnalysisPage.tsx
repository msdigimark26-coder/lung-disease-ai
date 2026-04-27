
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/hooks/useDashboard";
import { AnalysisResult } from "@/components/dashboard/AnalysisResult";
import { format } from "date-fns";
import { API_BASE_URL } from "@/services/api";

export default function AIAnalysisPage() {
    const { xrayReports } = useDashboard();


    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight font-poppins">AI Analysis</h1>
                    <p className="text-slate-500 font-medium mt-1">Upload X-ray images for automated AI diagnosis</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Upload & Preview Section */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                        <h2 className="text-xl font-black text-slate-900 font-poppins flex items-center gap-3 mb-6">
                            <span className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                            Upload X-Ray
                        </h2>
                        
                        <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-3xl p-12 flex flex-col items-center justify-center text-center hover:bg-indigo-50 hover:border-indigo-300 transition-colors cursor-pointer group">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Drag & Drop Image</h3>
                            <p className="text-slate-500 text-sm mb-6 max-w-sm">Support for JPG, PNG and DICOM files. Maximum file size 10MB.</p>
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold px-8">
                                Browse Files
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-slate-900 font-poppins flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-slate-800 rounded-full" />
                                Previous Reports
                            </h2>
                        </div>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {xrayReports.map((report) => (
                                <div key={report.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100 cursor-pointer">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-white">
                                        <img src={`${API_BASE_URL}/static/${report.image_path}`} alt="X-ray" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest truncate">Report #{report.id}</p>
                                            <span className="text-[10px] font-bold text-slate-500">{format(new Date(report.created_at), 'MMM d, yyyy')}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {report.prediction === 'Pneumonia' ? (
                                                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                                            ) : (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                            )}
                                            <p className="text-sm font-bold text-slate-900 truncate">{report.prediction} ({report.confidence.toFixed(1)}%)</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Analysis Output */}
                <div className="lg:col-span-5 h-[600px] lg:h-auto">
                    <AnalysisResult report={xrayReports[0] || null} />
                </div>
            </div>
        </div>
    );
}
