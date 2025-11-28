'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.1 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Link, buton veya tıklanabilir alan kontrolü
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('.cursor-pointer') // Tailwind 'cursor-pointer' sınıfı olanlar
            ) {
                if (!isHovering) playHover();
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{
                backgroundColor: 'white',
            }}
            animate={{
                x: mousePosition.x - 12, // w/2 (Merkezlemek için)
                y: mousePosition.y - 12,
                scale: isHovering ? 3 : 1, // Hover olunca daha da büyüsün
                opacity: 1,
            }}
            // 👇 KRİTİK AYARLAR BURADA 👇
            transition={{
                type: "spring",
                stiffness: 800,  // Yay sertliği (Eskisi 150 idi). Ne kadar yüksekse o kadar hızlı takip eder.
                damping: 35,     // Sürtünme. Titremeyi (wobble) engeller.
                mass: 0.1        // Kütle (Eskisi 0.5 idi). Ne kadar hafifse o kadar çabuk hızlanır.
            }}
        />
    );
}