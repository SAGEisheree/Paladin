import React from 'react';
import Nav from './nav.jsx';

const About = () => {
    return (
        <div className="min-h-screen bg-[#57c5e8] text-[#1a1a1a] selection:bg-white/30">
            <Nav />
            <div className="pt-20">
                <section className="px-8 pb-32 w-full max-w-7xl mx-auto">
                    <div className="bg-[#1a1a1a] text-white rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#57c5e8]/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 max-w-4xl">
                            <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter leading-none">
                                The Paladin <br />
                                <span className="text-[#57c5e8]">Methodology.</span>
                            </h2>

                            <div className="space-y-12">
                                <div className="flex gap-8 group">
                                    <div className="text-6xl font-black text-white/10 group-hover:text-[#57c5e8]/40 transition-colors">01</div>
                                    <div>
                                        <h4 className="text-2xl font-bold mb-3">Socratic Priming</h4>
                                        <p className="text-xl text-white/60 leading-relaxed font-medium">
                                            Unlike traditional LLMs, Paladin is hard-coded to ignore "tell me the answer" requests.
                                            It begins by dissecting your query into foundational logical units.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-8 group">
                                    <div className="text-6xl font-black text-white/10 group-hover:text-[#57c5e8]/40 transition-colors">02</div>
                                    <div>
                                        <h4 className="text-2xl font-bold mb-3">Adaptive Scaffolding</h4>
                                        <p className="text-xl text-white/60 leading-relaxed font-medium">
                                            Our context-aware loops monitor your response patterns. If a knowledge gap is detected,
                                            Paladin temporarily pivots to build the necessary bridge before resuming the main objective.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-8 group">
                                    <div className="text-6xl font-black text-white/10 group-hover:text-[#57c5e8]/40 transition-colors">03</div>
                                    <div>
                                        <h4 className="text-2xl font-bold mb-3">Mastery-Based Progression</h4>
                                        <p className="text-xl text-white/60 leading-relaxed font-medium">
                                            The session doesn't end based on a timer. It concludes when the AI confirms—through your
                                            own logical deductions—that you have reached the target 100% mastery level.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
