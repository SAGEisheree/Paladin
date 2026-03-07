import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Sparkles, MessageSquare, Brain, GraduationCap, Menu, X, Flame } from 'lucide-react';
import { useQuizContext } from './quizContext';

const Nav = () => {
  const navigate = useNavigate();
  const { streak, setIsShareModalOpen } = useQuizContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 md:py-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-white p-2 rounded-xl shadow-sm">
            <GraduationCap size={24} className="text-[#57c5e8]" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight">Paladin AI</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-medium text-sm">
          <a href="#" className="hover:opacity-70 transition text-black/70 hover:text-black">Pedagogy</a>
          <a href="#" className="hover:opacity-70 transition text-black/70 hover:text-black">Research</a>
          <a href="#" className="hover:opacity-70 transition text-black/70 hover:text-black">For Learners</a>
        </div>

        <div className="flex items-center gap-4">
          <div
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:bg-white/30 transition-all cursor-pointer select-none group"
          >
            <Flame size={18} className="text-orange-500 fill-orange-500/20 group-hover:scale-125 transition-transform" />
            <span className="text-sm font-black tracking-tight">{streak} Streak</span>
          </div>

          <button
            onClick={() => navigate('/about')}
            className="hidden sm:block bg-[#1a1a1a] text-white px-6 py-2 rounded-full font-bold transition hover:scale-105 active:scale-95 shadow-sm"
          >
            Learn more
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-2xl border-b border-black/5 overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen ? 'max-h-64 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}
      `}>
        <div className="flex flex-col items-center gap-6 font-bold text-lg">
          <a href="#" className="hover:opacity-70 transition" onClick={() => setIsOpen(false)}>Pedagogy</a>
          <a href="#" className="hover:opacity-70 transition" onClick={() => setIsOpen(false)}>Research</a>
          <a href="#" className="hover:opacity-70 transition" onClick={() => setIsOpen(false)}>For Learners</a>
          <button
            onClick={() => { navigate('/about'); setIsOpen(false); }}
            className="sm:hidden bg-[#1a1a1a] text-white px-8 py-3 rounded-full font-bold transition w-[80%]"
          >
            Learn more
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav