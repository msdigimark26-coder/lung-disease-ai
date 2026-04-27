import { useState } from "react";
import { Bell, CheckCircle2, AlertCircle, Activity, Check, Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Notification = {
    id: string;
    type: "alert" | "system" | "success" | "info";
    title: string;
    description: string;
    time: string;
    read: boolean;
};

const INITIAL_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        type: "alert",
        title: "Critical Vitals Drop",
        description: "Patient John Doe (PT-0001) SpO2 levels dropped below 90%.",
        time: "10 mins ago",
        read: false
    },
    {
        id: "2",
        type: "system",
        title: "Model Update Complete",
        description: "ResNet-50 AI Diagnostic model has been updated to v2.4.1.",
        time: "1 hour ago",
        read: false
    },
    {
        id: "3",
        type: "success",
        title: "Batch Processing Finished",
        description: "Successfully processed 142 daily routine X-ray scans.",
        time: "3 hours ago",
        read: true
    },
    {
        id: "4",
        type: "info",
        title: "New Patient Assigned",
        description: "Patient Jane Smith (PT-0042) has been assigned to your queue.",
        time: "5 hours ago",
        read: true
    },
    {
        id: "5",
        type: "alert",
        title: "Device Connectivity Lost",
        description: "IoT Vitals Monitor in Ward 4 Room B has lost connection.",
        time: "1 day ago",
        read: true
    }
];

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'alert': return <AlertCircle className="w-5 h-5 text-rose-500" />;
            case 'system': return <Activity className="w-5 h-5 text-blue-500" />;
            case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
            case 'info': return <Info className="w-5 h-5 text-amber-500" />;
            default: return <Bell className="w-5 h-5 text-slate-500" />;
        }
    };

    const getBgColor = (type: string, read: boolean) => {
        if (read) return "bg-white border-slate-200";
        switch (type) {
            case 'alert': return "bg-rose-50 border-rose-100";
            case 'system': return "bg-blue-50 border-blue-100";
            case 'success': return "bg-emerald-50 border-emerald-100";
            case 'info': return "bg-amber-50 border-amber-100";
            default: return "bg-slate-50 border-slate-100";
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight font-poppins flex items-center gap-3">
                        Notifications
                        {unreadCount > 0 && (
                            <Badge className="bg-blue-600 hover:bg-blue-600 text-white border-none px-2 py-0.5 rounded-lg text-xs">
                                {unreadCount} New
                            </Badge>
                        )}
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Manage your alerts, system updates, and messages.</p>
                </div>
                {unreadCount > 0 && (
                    <Button 
                        onClick={markAllAsRead}
                        variant="outline" 
                        className="bg-white hover:bg-slate-50 text-slate-600 font-bold rounded-xl gap-2 h-10 border-slate-200"
                    >
                        <Check className="w-4 h-4" /> Mark all as read
                    </Button>
                )}
            </div>

            {/* Notification List */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                {notifications.length === 0 ? (
                    <div className="p-16 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                            <Bell className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">All caught up!</h3>
                        <p className="text-slate-500">You have no new notifications.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {notifications.map((notification) => (
                            <div 
                                key={notification.id} 
                                className={cn(
                                    "p-6 flex flex-col sm:flex-row gap-5 transition-all relative group",
                                    getBgColor(notification.type, notification.read)
                                )}
                            >
                                <div className="flex-shrink-0 pt-1">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center border bg-white shadow-sm",
                                        notification.type === 'alert' ? "border-rose-100" :
                                        notification.type === 'system' ? "border-blue-100" :
                                        notification.type === 'success' ? "border-emerald-100" : "border-amber-100"
                                    )}>
                                        {getIcon(notification.type)}
                                    </div>
                                </div>
                                <div className="flex-1 pr-8">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                                        <h4 className={cn("text-base font-bold", notification.read ? "text-slate-700" : "text-slate-900")}>
                                            {notification.title}
                                        </h4>
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                            {notification.time}
                                        </span>
                                    </div>
                                    <p className={cn("text-sm leading-relaxed", notification.read ? "text-slate-500" : "text-slate-700 font-medium")}>
                                        {notification.description}
                                    </p>
                                </div>
                                
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                    {!notification.read && (
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            onClick={() => markAsRead(notification.id)}
                                            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-sm"
                                            title="Mark as read"
                                        >
                                            <Check className="w-4 h-4" />
                                        </Button>
                                    )}
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => deleteNotification(notification.id)}
                                        className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 shadow-sm"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
