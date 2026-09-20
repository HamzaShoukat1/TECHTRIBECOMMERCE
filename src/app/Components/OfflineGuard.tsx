"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react"; // Optional: icon library of your choice

export default function OfflineGuard({ children }: { children: React.ReactNode }) {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // 1. Set the initial state once on the client side
        setIsOnline(navigator.onLine);

        // 2. Event handlers for network changes
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // 3. Clean up event listeners on unmount
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    // If offline, block the app content and show the restriction screen
    if (!isOnline) {
        return (
            <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white p-6 text-center select-none animate-fadeIn">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500 mb-6">
                    <WifiOff className="h-10 w-10 animate-pulse" />
                </div>
                <h1 className="font-poppins text-[24px] font-bold text-neutral-900 mb-2">
                    Connection Lost
                </h1>
                <p className="font-poppins text-[16px] text-neutral-500 max-w-[320px] mb-6">
                    Please connect to Wi-Fi or mobile data to continue browsing the shop.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 bg-neutral-100 px-3 py-1.5 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-400"></span>
                    </span>
                    Waiting for network...
                </div>
            </div>
        );
    }

    // If online, render the app normally
    return <>{children}</>;
}
