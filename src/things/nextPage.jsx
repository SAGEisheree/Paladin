import React, { useState } from 'react';
import Nav from './nav.jsx';
import { BookOpen, GraduationCap, Book, Users, Briefcase } from 'lucide-react';

const NextPage = () => {
  const [activeTab, setActiveTab] = useState('Pick a Language');
  const [formData, setFormData] = useState({
    language: '',
    topic: '',
    subtopic: '',
    instructions: '',
    numQuestions: ''
  });

  const languages = [
    'English', 'Telugu', 'Hindi', 'Spanish', 'French',
    'German', 'Mandarin', 'Arabic', 'Bengali', 'Portuguese',
    'Russian', 'Japanese', 'Korean'
  ];

  const handleNext = (currentIndex) => {
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].name);
    }
  };

  const handleGo = () => {
    console.log("Submitting:", formData);
    // Submit action here
  };

  const tabs = [
    {
      name: 'Pick a Language',
      icon: BookOpen,
      content: 'Select the primary programming language for your customized learning journey.',
      title: 'Choose Language'
    },
    {
      name: 'Pick a topic',
      icon: GraduationCap,
      content: 'Define the main subject area or framework you want to master through Socratic dialogue.',
      title: 'Select Core Topic'
    },
    {
      name: 'Pick a subtopic',
      icon: Book,
      content: 'Zero in on a specific concept, algorithm, or pattern within your main topic.',
      title: 'Narrow Your Focus'
    },
    {
      name: 'Any extra instructions',
      icon: Users,
      content: 'Add any specific rules, prior knowledge, or goals to tailor the AI pedagogy to your needs.',
      title: 'Additional Context'
    },
    {
      name: 'Number of questions',
      icon: Briefcase,
      content: 'Choose the number of questions you want to be asked.',
      title: 'Pick number of questions'
    },
  ];

  return (
    <div className="min-h-screen bg-[#57c5e8] text-[#1a1a1a] selection:bg-white/30">
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <Nav />

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 flex flex-col lg:flex-row gap-10">

        {/* Sidebar / Tabs */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="mb-4">
            <h2 className="text-4xl font-extrabold tracking-tight mb-2">Workspace</h2>
            <p className="text-lg opacity-80 font-medium italic">Select a module to begin</p>
          </div>

          <div className="flex flex-col gap-3 bg-white/10 backdrop-blur-md p-4 rounded-[2rem] border border-white/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`relative z-10 flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ease-out border border-transparent ${isActive
                    ? 'bg-[#1a1a1a] text-white shadow-xl scale-[1.02] border-black/10'
                    : 'hover:bg-white/20 text-[#1a1a1a] hover:border-white/30'
                    }`}
                >
                  <Icon size={24} className={isActive ? 'text-[#57c5e8]' : 'opacity-70'} />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="h-full bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 shadow-2xl p-10 lg:p-14 flex flex-col justify-center min-h-[500px] relative overflow-hidden">

            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;

              if (!isActive) return null;

              return (
                <div
                  key={tab.name}
                  className="relative z-10"
                  style={{ animation: 'fadeInScale 0.4s ease-out forwards' }}
                >
                  <div className="w-20 h-20 bg-[#1a1a1a] rounded-3xl flex items-center justify-center mb-8 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Icon size={40} className="text-[#57c5e8]" />
                  </div>

                  <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                    {tab.title}
                  </h1>

                  <p className="text-2xl font-medium leading-relaxed opacity-90 max-w-2xl mb-12">
                    {tab.content}
                  </p>

                  <div className="mb-8 w-full max-w-xl">
                    {index === 0 && (
                      <select
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full bg-white/20 border border-white/40 text-[#1a1a1a] px-6 py-4 rounded-2xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-black/20 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select a Language</option>
                        {languages.map(lang => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    )}
                    {index === 1 && (
                      <input
                        type="text"
                        placeholder="e.g., Data Structures"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full bg-white/20 border border-white/40 text-[#1a1a1a] placeholder:text-black/50 px-6 py-4 rounded-2xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                      />
                    )}
                    {index === 2 && (
                      <input
                        type="text"
                        placeholder="e.g., Binary Trees"
                        value={formData.subtopic}
                        onChange={(e) => setFormData({ ...formData, subtopic: e.target.value })}
                        className="w-full bg-white/20 border border-white/40 text-[#1a1a1a] placeholder:text-black/50 px-6 py-4 rounded-2xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                      />
                    )}
                    {index === 3 && (
                      <input
                        type="text"
                        placeholder="e.g., Explain like I'm 5"
                        value={formData.instructions}
                        onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                        className="w-full bg-white/20 border border-white/40 text-[#1a1a1a] placeholder:text-black/50 px-6 py-4 rounded-2xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                      />
                    )}
                    {index === 4 && (
                      <input
                        type="number"
                        placeholder="e.g., 10"
                        min="1"
                        max="50"
                        value={formData.numQuestions}
                        onChange={(e) => setFormData({ ...formData, numQuestions: e.target.value })}
                        className="w-full bg-white/20 border border-white/40 text-[#1a1a1a] placeholder:text-black/50 px-6 py-4 rounded-2xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                      />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {index < tabs.length - 1 ? (
                      <button
                        onClick={() => handleNext(index)}
                        className="bg-[#1a1a1a] text-white hover:bg-black/80 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleGo}
                        className="bg-[#1a1a1a] text-white hover:bg-black/80 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105"
                      >
                        Go
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
};

export default NextPage;