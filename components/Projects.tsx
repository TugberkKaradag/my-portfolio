'use client';

import React, { useState } from 'react';
import { projectsData, Project } from '@/data/projects'; // Project tipini buradan çekiyoruz
import ProjectModal from './ProjectModal';
//import useSound from 'use-sound';

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Ses efektleri (Dosyaların public/sounds klasöründe olması lazım)
    // Eğer dosyan yoksa hata vermez ama ses çalmaz.
    /*const [playClick] = useSound('/sounds/click.mp3', { volume: 0.5 });
    const [playOpen] = useSound('/sounds/open.mp3', { volume: 0.5 });*/


    const handleCardClick = (project: Project) => {
        // playClick(); 
        // playOpen();  
        setSelectedProject(project);
    }

    return (
        <section id="projects" className="w-full min-h-screen bg-transparent text-white py-20 px-4 md:px-20 z-10 relative">
            <div className="max-w-6xl mx-auto">

                <h2 className="text-4xl md:text-5xl font-bold mb-12 border-b border-gray-800 pb-4 backdrop-blur-sm font-rajdhani uppercase">
                    Selected Works <span className="text-sm font-mono text-gray-500 ml-4 normal-case"> Engineering & R&D</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectsData.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => handleCardClick(project)} // Fonksiyonu burada çağırıyoruz
                            className={`group relative p-6 border border-white/10 rounded-xl bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer ${project.id === 1 ? 'md:col-span-2' : ''}`}
                        >

                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${project.color}`} />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors font-rajdhani uppercase tracking-wide">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 mb-6 text-sm leading-relaxed font-mono">
                                        {project.shortDesc}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-white/10 text-gray-300 border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Bileşeni */}
            {selectedProject && (
                <ProjectModal
                    selectedProject={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
}