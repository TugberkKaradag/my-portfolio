'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();


    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 h-[60vh] w-12 hidden md:flex flex-col items-center justify-between z-50 pointer-events-none mix-blend-difference">

            {/* dB İşaretçileri (Ruler) */}
            <div className="absolute right-0 h-full flex flex-col justify-between text-[10px] font-mono text-gray-500 py-1">
                <span>0dB</span>
                <span>-6</span>
                <span>-12</span>
                <span>-24</span>
                <span>-∞</span>
            </div>


            <div className="w-[2px] h-full bg-gray-800 relative overflow-hidden rounded-full">

                <motion.div
                    className="absolute bottom-0 left-0 w-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    style={{
                        height: "100%",
                        scaleY: scaleY,
                        transformOrigin: "bottom"
                    }}
                />
            </div>
        </div>
    );
}