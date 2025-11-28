'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import './GlitchText.css'; // Birazdan oluşturacağız

interface GlitchTextProps {
    text: string;
    className?: string;
}

export default function GlitchText({ text, className }: GlitchTextProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`glitch-wrapper ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h1 className="glitch-text" data-text={text}>
                {text}
            </h1>
        </div>
    );
}