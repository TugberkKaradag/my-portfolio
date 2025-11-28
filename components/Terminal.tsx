'use client';

import React, { useState, useEffect, useRef } from 'react';

type Log = {
    cmd: string;
    output: React.ReactNode;
};

export default function Terminal() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<Log[]>([
        { cmd: "init", output: "Terminal v1.0.4 loaded. Type 'help' for commands." }
    ]);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            let output: React.ReactNode = "";

            switch (cmd) {
                case 'help':
                    output = "Available commands: about, skills, github, email, clear, sudo";
                    break;
                case 'about':
                    output = "Tuğberk Karadağ. Software Engineer specialized in Audio/DSP, Game Dev and Web Programming.";
                    break;
                case 'skills':
                    output = "C++/C#, JUCE, Unity, HLSL, React, Next.js, System Architecture.";
                    break;
                case 'github':
                    output = (
                        <span>
                            Opening GitHub... <a href="https://github.com/TugberkKaradag" target="_blank" className="text-blue-400 underline hover:text-blue-300">Click here</a> if not redirected.
                        </span>
                    );
                    window.open('https://github.com/TugberkKaradag', '_blank');
                    break;
                case 'email':
                    output = "tugberkkaradag1@gmail.com (Copied to clipboard!)";
                    navigator.clipboard.writeText("tugberkkaradag1@gmail.com");
                    break;
                case 'sudo':
                    output = <span className="text-red-500">Permission denied: You are not root.</span>;
                    break;
                case 'clear':
                    setHistory([]);
                    setInput("");
                    return;
                default:
                    output = <span className="text-red-400">Command not found: {cmd}. Type 'help'.</span>;
            }

            setHistory([...history, { cmd, output }]);
            setInput("");
        }
    };

    return (
        <footer className="w-full bg-black py-20 px-4 border-t border-white/10 z-10 relative">
            <div className="max-w-3xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-lg p-6 font-mono text-sm md:text-base shadow-2xl overflow-hidden">

                {/* Terminal Header */}
                <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="ml-2 text-xs text-gray-500 font-rajdhani tracking-widest">guest@tugberk-system:~</span>
                </div>

                {/* Terminal Body */}
                <div
                    ref={containerRef}
                    className="h-64 overflow-y-auto space-y-2 text-gray-300 scrollbar-hide font-mono"
                >
                    {history.map((log, i) => (
                        <div key={i}>
                            <div className="flex gap-2">
                                <span className="text-green-500">➜</span>
                                <span className="text-blue-400">~</span>
                                <span className="opacity-80">{log.cmd}</span>
                            </div>
                            <div className="pl-6 text-gray-400 mt-1">{log.output}</div>
                        </div>
                    ))}

                    {/* Input Line */}
                    <div className="flex gap-2 items-center">
                        <span className="text-green-500">➜</span>
                        <span className="text-blue-400">~</span>
                        <input
                            type="text"
                            aria-label="Terminal Command Input"
                            placeholder="Type 'help'..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleCommand}
                            className="bg-transparent border-none outline-none text-white flex-1 focus:ring-0 placeholder-gray-700"
                            spellCheck={false}
                            autoComplete="off"
                        />
                        { }
                    </div>
                    { }
                </div>
            </div>

            <div className="text-center text-gray-600 text-xs mt-8 font-rajdhani uppercase tracking-wider">
                © {new Date().getFullYear()} Tuğberk Karadağ. All rights reserved.
            </div>
        </footer>
    );
}