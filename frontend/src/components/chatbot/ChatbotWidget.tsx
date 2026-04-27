import { useState, useRef, useEffect } from "react";
import { X, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// ChatGPT SVG Icon
const ChatGPTIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829v-2.3324a.0757.0757 0 0 1 .0332-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66 4.4802 4.4802 0 0 1-1.5394 3.0137l-.1419-.0852-4.0198-2.3155v-.724zM8.9056 3.6308a4.4802 4.4802 0 0 1 6.1265-1.637l-.1419.0804-4.783 2.7583a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V5.4475a4.504 4.504 0 0 1 1.2491-1.8167zm6.4104 5.0684l-3.0564-1.7654-3.0564 1.7654v3.5308l3.0564 1.7654 3.0564-1.7654V8.6992z" />
    </svg>
);

type Message = {
    id: string;
    text: string;
    sender: "user" | "bot";
};

const INITIAL_MESSAGES: Message[] = [
    {
        id: "1",
        text: "How can I help you today?",
        sender: "bot"
    }
];

export function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user"
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            const botResponses = [
                "I can certainly help you with that. Can you provide the specific Patient ID?",
                "According to the latest scans, there are signs of mild opacity in the lower lobes. Recommend further review.",
                "The real-time vitals for Patient PT-0001 show a sustained heart rate of 125 bpm. I've logged an alert.",
                "Yes, our Grad-CAM heatmap highlights the regions of interest with 94.2% confidence.",
                "I'll pull up the complete history for you. Just a moment."
            ];
            
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            
            const newBotMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: "bot"
            };

            setMessages(prev => [...prev, newBotMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <Button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-8 right-8 w-14 h-14 rounded-full bg-black hover:bg-slate-800 text-white shadow-xl shadow-black/20 transition-all duration-300 z-50 flex items-center justify-center",
                    isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100 hover:scale-110"
                )}
            >
                <ChatGPTIcon className="w-7 h-7" />
            </Button>

            {/* Chatbot Window */}
            <div
                className={cn(
                    "fixed bottom-8 right-8 w-[380px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right z-50",
                    isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-50 opacity-0 pointer-events-none"
                )}
            >
                {/* Header */}
                <div className="bg-white text-slate-900 px-4 py-3 flex items-center justify-between shrink-0 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">ChatGPT 4o</span>
                        <span className="text-[10px] text-slate-500 font-medium">by OpenAI</span>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full w-8 h-8"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-white space-y-6">
                    {messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={cn(
                                "flex gap-3",
                                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            {msg.sender === "bot" && (
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-600 text-white mt-1">
                                    <ChatGPTIcon className="w-5 h-5" />
                                </div>
                            )}
                            
                            <div className={cn(
                                "flex flex-col max-w-[85%]",
                                msg.sender === "user" ? "items-end" : "items-start"
                            )}>
                                <div className={cn(
                                    "px-4 py-2.5 text-[15px] leading-relaxed",
                                    msg.sender === "user" 
                                        ? "bg-slate-100 text-slate-900 rounded-2xl" 
                                        : "bg-transparent text-slate-900"
                                )}>
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex gap-3 max-w-[85%]">
                            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                                <ChatGPTIcon className="w-5 h-5" />
                            </div>
                            <div className="px-4 py-3.5 bg-transparent flex items-center gap-1.5 w-fit">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white shrink-0">
                    <form onSubmit={handleSend} className="relative flex items-center">
                        <Input 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Message ChatGPT..." 
                            className="bg-slate-100 border-transparent focus-visible:ring-0 focus-visible:border-slate-300 rounded-full h-12 pl-5 pr-12 text-sm shadow-none"
                        />
                        <Button 
                            type="submit" 
                            disabled={!inputValue.trim() || isTyping}
                            className={cn(
                                "absolute right-1 w-9 h-9 rounded-full shrink-0 p-0 transition-colors",
                                inputValue.trim() ? "bg-black text-white hover:bg-slate-800" : "bg-slate-200 text-slate-400"
                            )}
                        >
                            <ArrowUp className="w-5 h-5" />
                        </Button>
                    </form>
                    <div className="mt-2 text-center text-[10px] text-slate-400">
                        ChatGPT can make mistakes. Check important info.
                    </div>
                </div>
            </div>
        </>
    );
}
