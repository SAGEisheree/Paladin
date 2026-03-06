import React from 'react'
import { useNavigate } from 'react-router';
import { Sparkles, MessageSquare, Brain, GraduationCap } from 'lucide-react';

const Nav = () => {
  return (
          <nav className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-xl shadow-sm">
            <GraduationCap size={24} className="text-[#57c5e8]" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Paladin AI</span>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-sm">
          <a href="#" className="hover:opacity-70 transition">Pedagogy</a>
          <a href="#" className="hover:opacity-70 transition">Research</a>
          <a href="#" className="hover:opacity-70 transition">For Schools</a>
        </div>
        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-2 rounded-full font-bold transition">
          Learn more
        </button>
      </nav>
  )
}

export default Nav