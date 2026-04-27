import { useState } from "react";
import { Search, Filter, Plus, Edit2, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboard } from "@/hooks/useDashboard";
import { format } from "date-fns";
import { AddPatientModal } from "@/components/dashboard/AddPatientModal";

export default function PatientsPage() {
    const { patients } = useDashboard();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

    const filteredPatients = patients.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.id.toString().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight font-poppins">Patients</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage patient records and histories</p>
                </div>
                <Button 
                    onClick={() => setIsAddPatientOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 shadow-lg shadow-blue-200 gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Patient
                </Button>
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search patients by name or ID..."
                            className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus-visible:ring-blue-500 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="rounded-xl font-bold gap-2 text-slate-600 w-full sm:w-auto bg-white">
                        <Filter className="w-4 h-4" /> Filters
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50 text-left">
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Patient</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">ID</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Age</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Added On</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold font-poppins">
                                                {patient.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{patient.name}</p>
                                                <p className="text-xs text-slate-500 capitalize">{patient.gender}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-medium text-slate-600">PT-{patient.id.toString().padStart(4, '0')}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-medium text-slate-600">{patient.age} yrs</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                            Active
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-medium text-slate-500">
                                        {format(new Date(patient.created_at), 'MMM d, yyyy')}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <a href={`/patient/${patient.id}`} target="_blank" rel="noreferrer">
                                                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-blue-600 hover:bg-blue-50">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </a>
                                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100">
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-rose-500 hover:bg-rose-50">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredPatients.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center">
                                        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">No patients found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddPatientModal
                open={isAddPatientOpen}
                onOpenChange={setIsAddPatientOpen}
            />
        </div>
    );
}
