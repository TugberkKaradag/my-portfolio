'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';
import { X, Github, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
    selectedProject: Project | null;
    onClose: () => void;
}

export default function ProjectModal({ selectedProject, onClose }: ProjectModalProps) {
    if (!selectedProject) return null;

    return (
        <AnimatePresence>
            {selectedProject && (
                <>
                    {/* Arka Plan */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Kutusu */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#111] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative flex flex-col md:flex-row"
                        >

                            {/* --- DÜZELTİLEN BUTON (KAPAT) --- */}
                            {/* aria-label ekledik: Artık "Close modal" olarak okunacak */}
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close modal"
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* SOL Taraf: Medya */}
                            <div className="w-full md:w-1/2 bg-black flex items-center justify-center bg-grid-white/[0.05] relative overflow-hidden h-64 md:h-auto border-b md:border-b-0 md:border-r border-white/10">
                                {selectedProject.demoType === 'video' ? (
                                    <video
                                        src={selectedProject.demoUrl}
                                        controls
                                        autoPlay
                                        loop
                                        muted
                                        className="w-full h-full object-contain bg-black"
                                    />
                                ) : (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={selectedProject.demoUrl}
                                        alt={selectedProject.title}
                                        // object-cover yerine object-contain yaptık.
                                        // bg-black ekledik ki kenarlarda boşluk kalırsa siyah dolsun.
                                        className="w-full h-full object-contain bg-black"
                                    />
                                )}

                                <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60`} />
                            </div>

                            {/* SAĞ Taraf: İçerik */}
                            <div className="w-full md:w-1/2 p-8 flex flex-col">

                                <h2 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${selectedProject.color} bg-clip-text text-transparent`}>
                                    {selectedProject.title}
                                </h2>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {selectedProject.tech.map((t, i) => (
                                        <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="prose prose-invert max-w-none text-gray-300 mb-8 leading-relaxed">
                                    <p>{selectedProject.fullDesc}</p>
                                </div>

                                <div className="mt-auto flex gap-4">
                                    <a
                                        href={selectedProject.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
                                    >
                                        <Github size={20} />
                                        GitHub Repo
                                    </a>


                                </div>
                            </div>

                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}