import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, MessageSquare, Brain, GraduationCap } from 'lucide-react';
import Nav from './nav.jsx';


const HomePage = () => {
  const navigate = useNavigate();
  const [previousQuizzes, setPreviousQuizzes] = useState([]);

  return (
    <div className="min-h-screen bg-[#57c5e8] text-[#1a1a1a]  selection:bg-white/30">
      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">

        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          Paladin AI
        </h1>

        <div className="relative inline-block">
          <p className="text-2xl md:text-4xl font-medium leading-tight max-w-2xl italic">
            Don't just get the <span className="border-2 border-black rounded-full px-4 py-1 mx-1 not-italic">answer.</span> <br />
            Move beyond the answer. Master the <span className="bg-white/30 px-2 rounded-md">logic</span> through conversation.
          </p>


        </div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <button
            onClick={() => navigate('/next')}
            className="bg-[#1a1a1a] text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition shadow-2xl"
          >
            Start Learning
          </button>
          <p className="text-sm font-bold uppercase tracking-widest opacity-70">
            Powered by Adaptive Misconception Detection
          </p>
        </div>
      </main>

      {/* Previous Quizzes Section */}
      <section className="px-8 pb-16 w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left tracking-tight">
          Previous Quizzes
        </h2>
        {previousQuizzes.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-sm p-12 rounded-[2rem] border border-white/20 text-center flex flex-col items-center justify-center">
            <GraduationCap size={48} className="opacity-50 mb-4" />
            <p className="text-xl opacity-70 font-medium">
              No previous quizzes yet
            </p>
            <p className="text-sm opacity-50 mt-2">
              Start learning to see your history here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousQuizzes.map((quiz, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-[2rem] border border-white/20 hover:bg-white/20 transition cursor-pointer">
                <h3 className="font-bold text-xl">{quiz.title}</h3>
                <p className="opacity-80 mt-2 text-sm">{quiz.date}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Minimal Feature Cards */}
      <section className="px-8 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-[2rem] border border-white/20">
          <h3 className="font-bold text-xl mb-2">Socratic Method</h3>
          <p className="opacity-80">We never give the answer. We ask the right question to trigger your "Aha!" moment.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-[2rem] border border-white/20">
          <h3 className="font-bold text-xl mb-2">Pattern Adapting</h3>
          <p className="opacity-80">Our LLM adjusts its difficulty based on your specific response history.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-[2rem] border border-white/20">
          <h3 className="font-bold text-xl mb-2">Misconception Radar</h3>
          <p className="opacity-80">Detected a gap in logic? Paladin gently pivots to bridge that specific knowledge debt.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;