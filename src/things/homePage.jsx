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
    <div className="min-h-screen bg-[#57c5e8] text-[#1a1a1a] selection:bg-white/30 relative overflow-x-hidden">
      {/* Background Doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 select-none">
        {/* Top Left: Swirl */}
        <svg className="absolute top-20 left-10 w-32 h-32 text-white" viewBox="0 0 100 100">
          <path d="M20,50 Q40,20 60,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M30,60 Q50,40 70,70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Middle Right: Stars/Sparkles */}
        <svg className="absolute top-1/3 right-10 w-24 h-24 text-white animate-pulse" viewBox="0 0 100 100">
          <path d="M50,10 L55,40 L85,45 L55,50 L50,80 L45,50 L15,45 L45,40 Z" fill="currentColor" />
          <circle cx="20" cy="20" r="3" fill="currentColor" />
          <circle cx="80" cy="80" r="2" fill="currentColor" />
        </svg>

        {/* Bottom Left: Arrow */}
        <svg className="absolute bottom-1/4 left-5 w-40 h-40 text-white rotate-45" viewBox="0 0 100 100">
          <path d="M10,50 L90,50 M70,30 L90,50 L70,70" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20,40 Q40,60 60,40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* Top Right: Loop */}
        <svg className="absolute top-40 right-[15%] w-48 h-48 text-white opacity-40" viewBox="0 0 200 200">
          <path d="M50,150 C50,50 150,50 150,150 C150,250 50,250 50,150 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
        </svg>

        {/* New Doodles */}
        {/* Middle Left: Spiral */}
        <svg className="absolute top-1/2 left-20 w-32 h-32 text-white opacity-30" viewBox="0 0 100 100">
          <path d="M50,50 C60,40 70,50 60,60 C50,70 40,60 50,50 C60,40 80,60 60,80 C40,100 10,70 50,30 C90,-10 130,50 50,100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Bottom Right: Paper Airplane */}
        <svg className="absolute bottom-40 right-20 w-24 h-24 text-white opacity-40 rotate-12" viewBox="0 0 100 100">
          <path d="M10,50 L90,10 L70,90 L50,60 L10,50 Z M50,60 L90,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Near 'Why Paladin' Section: Lightbulb sketch */}
        <svg className="absolute top-[65%] left-[10%] w-20 h-20 text-white opacity-20" viewBox="0 0 100 100">
          <path d="M30,40 Q30,10 50,10 Q70,10 70,40 Q70,60 55,70 L55,85 L45,85 L45,70 Q30,60 30,40" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M40,90 L60,90 M45,95 L55,95" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50,0 L50,5 M80,20 L75,25 M100,50 L95,50 M20,20 L25,25 M0,50 L5,50" stroke="currentColor" strokeWidth="2" />
        </svg>

        {/* Scattered Cross-hatches */}
        <svg className="absolute top-[80%] right-[40%] w-16 h-16 text-white opacity-10" viewBox="0 0 40 40">
          <path d="M0,10 L40,10 M0,20 L40,20 M0,30 L40,30 M10,0 L10,40 M20,0 L20,40 M30,0 L30,40" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(15)" />
        </svg>

        {/* More New Doodles */}
        {/* Top left-ish: Cloud */}
        <svg className="absolute top-[10%] left-[15%] w-24 h-24 text-white opacity-20" viewBox="0 0 100 100">
          <path d="M25,60 Q15,60 15,50 Q15,40 25,40 Q25,25 40,25 Q50,25 55,35 Q65,25 75,35 Q85,35 85,50 Q85,60 75,60 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>

        {/* Near 'Pedagogical Shift': Hand-drawn circle */}
        <svg className="absolute top-[55%] right-[5%] w-32 h-32 text-white opacity-25" viewBox="0 0 100 100">
          <path d="M50,10 C20,10 10,40 10,60 C10,85 45,95 70,85 C95,75 95,35 75,15 C60,0 25,5 15,30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
        </svg>

        {/* Bottom left corner: Question mark */}
        <svg className="absolute bottom-10 left-10 w-16 h-16 text-white opacity-30 -rotate-12" viewBox="0 0 100 100">
          <path d="M40,30 Q40,10 60,10 Q80,10 80,30 Q80,50 60,50 L60,70 M60,85 L60,90" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>

        {/* Middle right section: More scribbles */}
        <svg className="absolute top-[40%] right-[2%] w-20 h-20 text-white opacity-15" viewBox="0 0 100 100">
          <path d="M10,20 L90,20 M15,30 L85,30 M20,40 L80,40 M10,50 L90,50" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>

        {/* FINAL BATCH OF DOODLES */}
        {/* Underline for the Title (Hero Section) */}
        <svg className="absolute top-[32%] md:top-[28%] left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-10 text-white opacity-40" viewBox="0 0 400 20">
          <path d="M10,10 Q100,15 200,10 T390,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M20,15 Q110,18 210,14 T380,16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>

        {/* Near CTA: Thought Bubble */}
        <svg className="absolute top-[60%] left-[65%] w-20 h-20 text-white opacity-20 hidden md:block" viewBox="0 0 100 100">
          <path d="M20,50 Q20,30 40,30 Q60,30 60,50 Q60,70 40,70 Q30,75 20,80 Q25,70 20,50" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="75" cy="40" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="85" cy="30" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Hand-drawn Arrow towards the Difference Section */}
        <svg className="absolute top-[45%] left-1/2 -rotate-90 w-24 h-24 text-white opacity-20" viewBox="0 0 100 100">
          <path d="M50,10 L50,90 M30,70 L50,90 L70,70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Small '+' and 'x' marks scattered */}
        <svg className="absolute top-[25%] left-[85%] w-10 h-10 text-white opacity-20" viewBox="0 0 20 20">
          <path d="M10,2 L10,18 M2,10 L18,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg className="absolute top-[70%] left-[5%] w-8 h-8 text-white opacity-15 rotate-45" viewBox="0 0 20 20">
          <path d="M10,2 L10,18 M2,10 L18,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg className="absolute bottom-[30%] right-[10%] w-12 h-12 text-white opacity-20" viewBox="0 0 20 20">
          <path d="M10,2 L10,18 M2,10 L18,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Near Workspace: Hand-drawn Underline */}
        <svg className="absolute top-[72%] left-[10%] w-48 h-8 text-white opacity-30" viewBox="0 0 100 20">
          <path d="M5,10 Q50,15 95,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Top Right Corner: Scribble */}
        <svg className="absolute top-5 right-5 w-20 h-20 text-white opacity-10" viewBox="0 0 50 50">
          <path d="M5,5 Q15,45 25,5 T45,45" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Notebook Spiral Effect on the left edge */}
        <svg className="absolute top-[15%] left-2 w-8 h-[70%] text-white opacity-10" viewBox="0 0 20 500" preserveAspectRatio="none">
          <path d="M0,10 Q20,15 0,20 M0,40 Q20,45 0,50 M0,70 Q20,75 0,80 M0,100 Q20,105 0,110 M0,130 Q20,135 0,140 M0,160 Q20,165 0,170 M0,190 Q20,195 0,200 M0,220 Q20,225 0,230 M0,250 Q20,255 0,260 M0,280 Q20,285 0,290 M0,310 Q20,315 0,320 M0,340 Q20,345 0,350 M0,370 Q20,375 0,380 M0,400 Q20,405 0,410 M0,430 Q20,435 0,440 M0,460 Q20,465 0,470 M0,490 Q20,495 0,500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Near Features Section : Underline */}
        <svg className="absolute top-[86%] left-[8%] w-64 h-10 text-white opacity-25" viewBox="0 0 100 20">
          <path d="M5,10 Q50,18 95,8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>

        {/* More stars and dots scattered */}
        <svg className="absolute top-[30%] left-[5%] w-6 h-6 text-white opacity-20" viewBox="0 0 10 10">
          <path d="M5,0 L6,4 L10,5 L6,6 L5,10 L4,6 L0,5 L4,4 Z" fill="currentColor" />
        </svg>
        <svg className="absolute top-[50%] right-[12%] w-8 h-8 text-white opacity-15" viewBox="0 0 100 100">
          <path d="M50,0 L61,35 L100,50 L61,65 L50,100 L39,65 L0,50 L39,35 Z" fill="currentColor" />
        </svg>

        {/* Scattered 'x' and 'o' marks */}
        <div className="absolute top-[18%] right-[40%] text-white opacity-10 font-bold rotate-12 text-sm select-none">x</div>
        <div className="absolute top-[22%] right-[42%] text-white opacity-10 font-bold -rotate-12 text-sm select-none">o</div>
        <div className="absolute top-[65%] left-[40%] text-white opacity-10 font-bold rotate-45 text-sm select-none">x</div>
        <div className="absolute top-[68%] left-[42%] text-white opacity-10 font-bold -rotate-45 text-sm select-none">o</div>
        <div className="absolute bottom-[20%] left-[60%] text-white opacity-10 font-bold rotate-12 text-sm select-none">x</div>

        {/* Wavy Line on the right edge */}
        <svg className="absolute top-[20%] right-2 w-6 h-[60%] text-white opacity-10" viewBox="0 0 20 500" preserveAspectRatio="none">
          <path d="M10,0 Q20,25 10,50 T10,100 T10,150 T10,200 T10,250 T10,300 T10,350 T10,400 T10,450 T10,500" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Parentheses around empty space */}
        <div className="absolute top-[48%] left-[12%] text-white opacity-10 text-4xl font-light select-none">(</div>
        <div className="absolute top-[52%] left-[18%] text-white opacity-10 text-4xl font-light select-none">)</div>

        {/* Small Hand-sketched box */}
        <svg className="absolute top-[92%] right-[15%] w-24 h-24 text-white opacity-20 -rotate-12" viewBox="0 0 100 100">
          <path d="M10,10 L90,12 L88,90 L12,88 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M15,15 L85,17 M15,25 L85,27" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* ULTRA-DENSE SUBTLE LAYER */}
        {/* Ticks near feature cards */}
        <div className="absolute top-[82%] left-[30%] text-white opacity-10 text-xl font-bold select-none rotate-12">✓</div>
        <div className="absolute top-[84%] left-[60%] text-white opacity-10 text-xl font-bold select-none -rotate-12">✓</div>
        <div className="absolute top-[80%] right-[20%] text-white opacity-10 text-xl font-bold select-none rotate-45">✓</div>

        {/* Vertical Ticks (Notebook spiral-ish) */}
        <div className="absolute top-[30%] left-5 text-white opacity-10 text-lg font-bold select-none">|</div>
        <div className="absolute top-[32%] left-5 text-white opacity-10 text-lg font-bold select-none">|</div>
        <div className="absolute top-[34%] left-5 text-white opacity-10 text-lg font-bold select-none">|</div>

        {/* More stars and pluses in plain gaps */}
        <div className="absolute top-[12%] right-[20%] text-white opacity-15 text-2xl font-light select-none">+</div>
        <div className="absolute top-[55%] left-[15%] text-white opacity-15 text-2xl font-light select-none">*</div>
        <div className="absolute bottom-[15%] right-[45%] text-white opacity-10 text-2xl font-light select-none">+</div>

        {/* More Floating Dots spread around */}
        <div className="absolute top-[20%] left-[40%] w-2 h-2 bg-white rounded-full animate-bounce delay-75" />
        <div className="absolute top-[8%] left-[10%] w-1 h-1 bg-white rounded-full opacity-20" />
        <div className="absolute top-[5%] left-[60%] w-1.5 h-1.5 bg-white rounded-full opacity-30" />
        <div className="absolute top-[15%] right-[25%] w-1.5 h-1.5 bg-white rounded-full opacity-40" />
        <div className="absolute top-[28%] left-[80%] w-1 h-1 bg-white rounded-full opacity-30" />
        <div className="absolute top-[35%] left-[80%] w-2 h-2 bg-white rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-[42%] left-[10%] w-3 h-3 bg-white rounded-full opacity-10" />
        <div className="absolute top-[55%] left-[90%] w-1.5 h-1.5 bg-white rounded-full opacity-40" />
        <div className="absolute top-[49%] right-[5%] w-2 h-2 bg-white rounded-full opacity-20" />
        <div className="absolute top-[45%] left-[25%] w-2.5 h-2.5 bg-white rounded-full opacity-30 animate-pulse" />
        <div className="absolute top-[60%] right-[30%] w-3 h-3 bg-white rounded-full opacity-50 animate-pulse" />
        <div className="absolute top-[65%] left-[5%] w-1.5 h-1.5 bg-white rounded-full opacity-20" />
        <div className="absolute top-[75%] left-[45%] w-2 h-2 bg-white rounded-full opacity-40" />
        <div className="absolute top-[78%] right-[5%] w-2 h-2 bg-white rounded-full opacity-30" />
        <div className="absolute top-[85%] right-[10%] w-1.5 h-1.5 bg-white rounded-full opacity-50" />
        <div className="absolute bottom-[10%] left-[20%] w-1.5 h-1.5 bg-white rounded-full" />
        <div className="absolute bottom-[2%] left-[50%] w-2 h-2 bg-white rounded-full opacity-40 animate-pulse" />
        <div className="absolute bottom-[5%] right-[15%] w-2 h-2 bg-white rounded-full opacity-60 animate-bounce" />
        <div className="absolute bottom-[25%] left-[35%] w-2.5 h-2.5 bg-white rounded-full opacity-20" />
        <div className="absolute bottom-[35%] left-[10%] w-1.5 h-1.5 bg-white rounded-full opacity-10" />
        <div className="absolute bottom-[40%] right-[5%] w-2 h-2 bg-white rounded-full opacity-30" />
        <div className="absolute bottom-[50%] left-[5%] w-1.5 h-1.5 bg-white rounded-full opacity-20" />
      </div>

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

      {/* The Paladin Difference Section */}
      <section className="px-8 pb-32 w-full max-w-7xl mx-auto">
        <div className="bg-[#1a1a1a] text-white rounded-[3.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#57c5e8]/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-[#57c5e8]/20 text-[#57c5e8] px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em]">
                Pedagogical Shift
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                Not a <span className="text-[#57c5e8]">Chatbot.</span><br />
                A Socratic <span className="italic">Guide.</span>
              </h2>
              <p className="text-xl text-white/50 font-medium leading-relaxed max-w-lg">
                While standard AI gives answers, Paladin uses the Socratic method to reveal your logic gaps and help you bridge them yourself.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-colors">
                <div className="text-red-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" /> Standard AI
                </div>
                <p className="text-lg font-bold opacity-80 leading-snug">
                  "The answer to your question is X. Hope that helps!"
                </p>
                <p className="mt-4 text-sm opacity-40 font-medium italic">
                  Passively provides information, creating an illusion of competence.
                </p>
              </div>

              <div className="bg-[#57c5e8]/10 border border-[#57c5e8]/30 p-8 rounded-[2.5rem] hover:bg-[#57c5e8]/20 transition-colors scale-105 shadow-[0_0_30px_rgba(87,197,232,0.1)]">
                <div className="text-[#57c5e8] text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#57c5e8] animate-pulse" /> Paladin AI
                </div>
                <p className="text-lg font-bold text-white leading-snug">
                  "If we assume Y is true, how would that change your logic for X?"
                </p>
                <p className="mt-4 text-sm text-[#57c5e8]/60 font-medium italic">
                  Actively questions assumptions, ensuring deep neurological retention.
                </p>
              </div>
            </div>
          </div>
        </div>
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
                  <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-1">Level</p>
                  <p className="text-lg font-bold">{selectedQuiz.config.knowledgeLevel}</p>
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