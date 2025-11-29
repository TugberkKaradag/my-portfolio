export type Project = {
    id: number;
    title: string;
    shortDesc: string;
    fullDesc: string;
    tech: string[];
    githubLink: string;
    demoType: 'video' | 'image';
    demoUrl: string;
    color: string;
};

export const projectsData: Project[] = [
    {
        id: 1,
        title: "KaradagReverb",
        shortDesc: "High-performance algorithmic reverb VST plugin.",
        fullDesc: "Built with C++ and the JUCE framework, this VST3 plugin implements the Schroeder-Moorer reverberation architecture. The project focuses on real-time DSP optimization, utilizing SIMD instructions and lock-free circular buffers to ensure zero-latency processing and minimal CPU footprint.",
        tech: ["C++", "JUCE", "DSP", "Audio Plugin"],
        githubLink: "https://github.com/TugberkKaradag/KaradagReverb",
        demoType: 'image',

        demoUrl: "/reverb.png",
        color: "from-blue-500 to-cyan-400"
    },
    {
        id: 2,
        title: "TUFAN",
        shortDesc: "Hack-and-Slash Action-RPG with custom VFX pipeline.",
        fullDesc: "An immersive Action-RPG developed in Unity, featuring fast-paced combat mechanics and enemy AI. Beyond gameplay engineering, the project showcases technical art skills with custom ShaderLab & HLSL visual effects, including volumetric lighting and particle-based skill effects computed on the GPU.",
        tech: ["Unity", "C#", "ShaderLab", "A-RPG"],
        githubLink: "https://github.com/TugberkKaradag/TUFAN",
        demoType: 'video',

        demoUrl: "/tufan.mp4",
        color: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        title: "KaradagDelay",
        shortDesc: "Digital delay unit with LFO modulation.",
        fullDesc: "A creative audio effect that integrates LFO modulation into the feedback loop, allowing for tape-delay simulation and chorus-like effects. The engine is built on raw C++ audio callbacks, demonstrating efficient memory management and signal processing algorithms without relying on high-level abstractions.",
        tech: ["C++", "Audio DSP", "VST3", "Algorithms"],
        githubLink: "https://github.com/TugberkKaradag",
        demoType: 'image',
        demoUrl: "/delay.png",
        color: "from-emerald-400 to-green-600"
    },
    {
        id: 4,
        title: "Precision Warfare",
        shortDesc: "Single-player turn-based tactical strategy game.",
        fullDesc: "A tactical strategy game where the player commands units on a grid-based map against AI opponents. The project demonstrates strong architectural patterns including a robust Turn Management System, A* Pathfinding algorithms for grid navigation, and Finite State Machine (FSM) driven enemy AI that evaluates tactical advantages.",
        tech: ["C#", "Unity", "A* Pathfinding", "FSM AI"],
        githubLink: "https://github.com/TugberkKaradag/Precision-Warfare---Tactical-Engagements",
        demoType: 'image',
        demoUrl: "/precision.jpeg",
        color: "from-orange-500 to-red-600"
    },
    {
        id: 5,
        title: "Librarian Project",
        shortDesc: "Low-level system automation written in pure C.",
        fullDesc: "A system-level application demonstrating mastery of low-level concepts such as manual memory management (malloc/free), pointer arithmetic, and file I/O operations. Custom linked-list data structures were implemented from scratch to handle record management efficiently.",
        tech: ["C", "Pointers", "Data Structures", "File I/O"],
        githubLink: "https://github.com/TugberkKaradag/Librarian-Project",
        demoType: 'image',
        demoUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop",
        color: "from-gray-400 to-slate-600"
    },
    {
        id: 6,
        title: "PongKong",
        shortDesc: "Classic arcade clone exploring game engine fundamentals.",
        fullDesc: "Developed to master the core concepts of game development, this project implements a custom game loop, AABB collision detection, and physics calculations using C++. It showcases Object-Oriented Programming (OOP) principles applied to game entity management.",
        tech: ["C++", "Game Physics", "OOP", "Game Loop"],
        githubLink: "https://github.com/TugberkKaradag/PongKong",
        demoType: 'image',
        demoUrl: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=1974&auto=format&fit=crop",
        color: "from-yellow-400 to-amber-600"
    }
];