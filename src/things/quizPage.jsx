import React from 'react';
import { useNavigate } from 'react-router';
import Nav from './nav.jsx';
import { useQuizContext } from './quizContext';

const QuizPage = () => {
    const { quizData } = useQuizContext();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#57c5e8] text-[#1a1a1a] selection:bg-white/30">
            <Nav />
            <main className="max-w-4xl mx-auto px-6 pt-20 pb-24 flex flex-col items-center">
                <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 shadow-2xl p-10 lg:p-14 w-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                    <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight text-center">
                        Your Selection
                    </h1>

                    <div className="space-y-6">
                        <div className="bg-white/20 rounded-2xl p-6 border border-white/30">
                            <h3 className="text-sm font-bold uppercase tracking-widest opacity-70 mb-1">Language</h3>
                            <p className="text-2xl font-medium">{quizData.language || 'Not selected'}</p>
                        </div>

                        <div className="bg-white/20 rounded-2xl p-6 border border-white/30">
                            <h3 className="text-sm font-bold uppercase tracking-widest opacity-70 mb-1">Topic</h3>
                            <p className="text-2xl font-medium">{quizData.topic || 'Not selected'}</p>
                        </div>

                        <div className="bg-white/20 rounded-2xl p-6 border border-white/30">
                            <h3 className="text-sm font-bold uppercase tracking-widest opacity-70 mb-1">Subtopic</h3>
                            <p className="text-2xl font-medium">{quizData.subtopic || 'Not selected'}</p>
                        </div>

                        <div className="bg-white/20 rounded-2xl p-6 border border-white/30">
                            <h3 className="text-sm font-bold uppercase tracking-widest opacity-70 mb-1">Instructions</h3>
                            <p className="text-2xl font-medium">{quizData.instructions || 'None'}</p>
                        </div>

                        <div className="bg-white/20 rounded-2xl p-6 border border-white/30">
                            <h3 className="text-sm font-bold uppercase tracking-widest opacity-70 mb-1">Number of Questions</h3>
                            <p className="text-2xl font-medium">{quizData.numQuestions || 'Not set'}</p>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => navigate('/chat')}
                            className="bg-[#1a1a1a] text-white hover:bg-black/80 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105"
                        >
                            Lets go
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default QuizPage;
