'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SystemStatus() {
    const [time, setTime] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const mountTimer = setTimeout(() => {
            setMounted(true);
        }, 0);

        const timer = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString('tr-TR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }));
        }, 1000);

        return () => {
            clearTimeout(mountTimer);
            clearInterval(timer);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed top-6 left-6 z-50 font-mono text-xs md:text-sm select-none pointer-events-none">

            <div className="flex items-center gap-4">

                <div className="relative w-12 h-12">
                    <Image
                        src="/icon.png"
                        alt="TK Logo"
                        fill
                        className="object-contain mix-blend-screen opacity-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    />
                </div>


                <div className="h-8 w-[1px] bg-white/20"></div>


                <div>

                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
                        </span>
                        <span className="tracking-widest font-bold text-white font-rajdhani drop-shadow-md">SYSTEM ONLINE</span>
                    </div>

                    <div className="flex flex-col text-[10px] text-gray-400 font-mono leading-tight">
                        <div className="tracking-wide">LOC: ISTANBUL, TR</div>
                        <div className="text-gray-300">TIME: {time}</div>
                    </div>
                </div>
            </div>

            <div className="flex items-center mt-2 opacity-50">
                <div className="w-2 h-2 border-l border-b border-white/50"></div>
                <div className="w-24 h-[1px] bg-gradient-to-r from-white/50 to-transparent"></div>
            </div>

        </div>
    );
}