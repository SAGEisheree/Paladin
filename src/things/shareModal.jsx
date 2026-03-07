import React from 'react';
import { X, Share2, Flame, ChevronRight } from 'lucide-react';
import { useQuizContext } from './quizContext';

const ShareModal = () => {
    const { isShareModalOpen, setIsShareModalOpen, previousQuizzes, streak } = useQuizContext();

    if (!isShareModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#57c5e8] w-full max-w-xl rounded-[3.5rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300"
            >
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <button
                    onClick={() => setIsShareModalOpen(false)}
                    className="absolute top-8 right-8 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors z-20"
                >
                    <X size={24} />
                </button>

                <div className="p-10 md:p-14 relative z-10 text-white">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-xl">
                            <Flame size={40} className="text-orange-400 fill-orange-400 animate-pulse" />
                        </div>
                        <div>
                            <div className="text-white/70 text-sm font-black uppercase tracking-[0.2em]">Learning Streak</div>
                            <div className="text-5xl font-black tracking-tighter leading-none">{streak} Day Streak</div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            <Share2 size={24} />
                            Workspace History
                        </h3>
                        <div className="max-h-[250px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
                            {previousQuizzes.length > 0 ? (
                                previousQuizzes.map((quiz, idx) => (
                                    <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center justify-between group hover:bg-white/20 transition-all">
                                        <div>
                                            <p className="font-black text-lg leading-none mb-1">{quiz.title}</p>
                                            <p className="text-sm font-medium text-white/60">{new Date(quiz.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRight size={18} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center italic opacity-60">
                                    Primary journey data is empty. Start your first session to share!
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-12 flex items-center justify-between">
                        <div className="text-sm font-medium opacity-70 italic max-w-[250px]">
                            "True wisdom begins with admitting we know nothing."
                        </div>
                        <div className="bg-black text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">
                            Paladin AI
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
