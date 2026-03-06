import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, MessageSquare, Brain, GraduationCap, ChevronRight, Trash2, X } from 'lucide-react';
import Nav from './nav.jsx';
import { useQuizContext } from './quizContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { previousQuizzes, selectSession, deleteQuiz, resetQuiz } = useQuizContext();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleStartNew = () => {
    resetQuiz();
    navigate('/next');
  };

  const handleOpenModal = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleResume = () => {
    if (selectedQuiz) {
      selectSession(selectedQuiz);
      navigate('/chat');
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteQuiz(id);
    if (selectedQuiz?.id === id) setSelectedQuiz(null);
  };

  return (
    <div className="min-h-screen bg-[#57c5e8] text-[#1a1a1a] selection:bg-white/30">
      <Nav />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-[#1a1a1a]">
          Paladin AI
        </h1>
        <div className="relative">
          <p className="text-2xl md:text-4xl font-semibold leading-tight max-w-2xl italic text-[#1a1a1a]/90">
            Don't just get the <span className="border-2 border-black rounded-full px-4 py-1 mx-1 not-italic">answer.</span> <br />
            Master the <span className="bg-white/40 px-3 rounded-xl shadow-sm">logic</span> through Socratic dialogue.
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6">
          <button
            onClick={handleStartNew}
            className="bg-[#1a1a1a] text-white px-12 py-5 rounded-[2rem] text-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          >
            Start Learning
          </button>
          <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">
            Adaptive Misconception Detection Engine
          </p>
        </div>
      </main>

      {/* Previous Quizzes Section */}
      <section className="px-8 pb-32 w-full max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black tracking-tighter">Your Workspace</h2>
            <p className="text-lg font-medium opacity-60">Continue where you left off</p>
          </div>
        </div>

        {previousQuizzes.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md p-20 rounded-[3rem] border border-white/30 text-center flex flex-col items-center justify-center shadow-xl">
            <div className="bg-white/20 p-6 rounded-3xl mb-6">
              <GraduationCap size={64} className="opacity-40" />
            </div>
            <p className="text-2xl opacity-80 font-bold tracking-tight">
              No sessions found
            </p>
            <p className="text-lg opacity-40 mt-2 font-medium">
              Your pedagogical history will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {previousQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                onClick={() => handleOpenModal(quiz)}
                className="group relative bg-white/15 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 hover:bg-white/25 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleDelete(e, quiz.id)}
                    className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded-2xl transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="mb-4 bg-white/30 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <MessageSquare size={24} className="text-black/60" />
                </div>

                <h3 className="font-black text-2xl mb-1 tracking-tight truncate pr-10">{quiz.title}</h3>
                <div className="flex items-center gap-2 text-sm font-bold opacity-40">
                  <Sparkles size={14} />
                  <span>{quiz.date}</span>
                </div>

                <div className="mt-8 flex items-center justify-between text-sm font-black uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                  <span>{quiz.messages?.length || 0} Exchanges</span>
                  <ChevronRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal Preview */}
      {selectedQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#57c5e8] w-full max-w-2xl rounded-[3rem] border border-white/50 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
          >
            <div className="relative p-10">
              <button
                onClick={() => setSelectedQuiz(null)}
                className="absolute top-8 right-8 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <div className="inline-block bg-white/30 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">Session Preview</div>
                <h2 className="text-5xl font-black tracking-tighter leading-none pr-10">{selectedQuiz.title}</h2>
                <p className="mt-4 text-xl font-medium opacity-70">Started on {selectedQuiz.date}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-white/20 p-6 rounded-[2rem] border border-white/30">
                  <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-1">Language</p>
                  <p className="text-lg font-bold">{selectedQuiz.config.language}</p>
                </div>
                <div className="bg-white/20 p-6 rounded-[2rem] border border-white/30">
                  <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-1">Target</p>
                  <p className="text-lg font-bold">{selectedQuiz.config.numQuestions} Questions</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleResume}
                  className="flex-1 bg-[#1a1a1a] text-white py-6 rounded-3xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  Resume Session
                  <ChevronRight size={24} />
                </button>
                <button
                  onClick={(e) => handleDelete(e, selectedQuiz.id)}
                  className="bg-white/20 hover:bg-red-500 hover:text-white text-red-600 p-6 rounded-3xl transition-all shadow-lg hover:shadow-red-500/20"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Feature Cards */}
      <section className="px-8 pb-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/30 shadow-lg">
          <div className="bg-black/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
            <Brain size={28} />
          </div>
          <h3 className="font-black text-2xl mb-4 tracking-tight">Logic-First</h3>
          <p className="text-lg opacity-60 font-medium leading-relaxed">We never hand out answers. Our AI guides your brain through the exact path of deduction.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/30 shadow-lg">
          <div className="bg-black/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
            <Sparkles size={28} />
          </div>
          <h3 className="font-black text-2xl mb-4 tracking-tight">Dynamic Adaptation</h3>
          <p className="text-lg opacity-60 font-medium leading-relaxed">Difficulty levels shift in real-time based on the subtle patterns in your response history.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/30 shadow-lg">
          <div className="bg-black/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
            <MessageSquare size={28} />
          </div>
          <h3 className="font-black text-2xl mb-4 tracking-tight">Socratic Echo</h3>
          <p className="text-lg opacity-60 font-medium leading-relaxed">Pivots immediately when a misconception is detected, bridging knowledge gaps before they grow.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;