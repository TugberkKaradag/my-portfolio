'use client';

import { useState, useEffect } from 'react';

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
        <div className="fixed top-6 left-6 z-50 font-mono text-xs md:text-sm text-gray-400 select-none pointer-events-none mix-blend-difference">


            <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="tracking-widest font-bold text-white font-rajdhani">SYSTEM ONLINE</span>
            </div>


            <div className="flex flex-col gap-0.5 opacity-70">
                <div>LOC: ISTANBUL, TURKEY</div>
                <div>TIME: {time}</div>
            </div>


            <div className="w-16 h-[1px] bg-white/20 mt-2"></div>
            <div className="w-16 h-[1px] bg-white/20 mt-1 ml-4"></div>

        </div>
    );
}