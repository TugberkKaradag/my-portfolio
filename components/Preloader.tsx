'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
    "Initializing Kernel...",
    "Loading DSP Modules...",
    "> Audio Driver: OK",
    "> Shader Compiler: OK",
    "> Quantum Field: STABLE",
    "Accessing User Profile: Tugberk Karadag",
    "System Ready."
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        let delay = 0;

        bootLines.forEach((line, index) => {

            delay += Math.random() * 300 + 100;

            setTimeout(() => {
                setLines((prev) => [...prev, line]);
            }, delay);
        });


        setTimeout(() => {
            onComplete();
        }, delay + 800);

    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black text-green-500 font-mono p-10 flex flex-col justify-end pb-20 overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
        >
            {lines.map((line, i) => (
                <div key={i} className="mb-2">
                    <span className="opacity-50 mr-2">root@system:~$</span>
                    {line}
                </div>
            ))}
            <div className="animate-pulse">_</div>
        </motion.div>
    );
}