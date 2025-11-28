'use client';

const techs = [
    "C++", "JUCE", "DSP", "AUDIO PROGRAMMING", "OPENGL", "HLSL",
    "UNITY", "C#", "REACT", "NEXT.JS", "TYPESCRIPT", "GIT", "DOCKER",
    "LINUX", "ALGORITHMS", "DATA STRUCTURES"
];

export default function TechMarquee() {
    return (
        <div className="w-full py-10 bg-black overflow-hidden relative z-10 border-t border-b border-white/5">

            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

            <div className="flex w-max animate-infinite-scroll">

                {[...techs, ...techs].map((tech, index) => (
                    <div key={index} className="flex items-center mx-8">
                        <span className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-500 to-gray-800 font-rajdhani uppercase tracking-widest whitespace-nowrap hover:from-white hover:to-gray-400 transition-colors duration-300 cursor-default">
                            {tech}
                        </span>
                        <span className="ml-8 text-indigo-500/30 text-xl">::</span>
                    </div>
                ))}
            </div>
        </div>
    );
}