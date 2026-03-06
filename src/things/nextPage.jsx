import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Nav from './nav.jsx';
import { BookOpen, GraduationCap, Book, Users, Briefcase } from 'lucide-react';
import { useQuizContext } from './quizContext';

const NextPage = () => {
  const [activeTab, setActiveTab] = useState('Pick a Language');
  const { quizData, setQuizData, addQuiz } = useQuizContext();
  const navigate = useNavigate();

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
    const newQuiz = {
      id: Date.now().toString(),
      title: `${quizData.topic} - ${quizData.subtopic}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      config: { ...quizData },
      messages: []
    };
    addQuiz(newQuiz);
    navigate('/chat');
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
      name: 'Knowledge Level',
      icon: Briefcase,
      content: 'Define the target mastery you want to achieve through this session.',
      title: 'Pick Knowledge Level'
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
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => setQuizData({ ...quizData, language: quizData.language === 'English' ? '' : 'English' })}
                            className={`px-6 py-3 rounded-2xl font-medium text-lg transition-all ${quizData.language === 'English'
                              ? 'bg-[#1a1a1a] text-white shadow-xl'
                              : 'bg-white/20 border border-white/40 text-[#1a1a1a] hover:bg-white/30'
                              }`}
                          >
                            English
                          </button>
                          <button
                            onClick={() => setQuizData({ ...quizData, language: quizData.language === 'Telugu' ? '' : 'Telugu' })}
                            className={`px-6 py-3 rounded-2xl font-medium text-lg transition-all ${quizData.language === 'Telugu'
                              ? 'bg-[#1a1a1a] text-white shadow-xl'
                              : 'bg-white/20 border border-white/40 text-[#1a1a1a] hover:bg-white/30'
                              }`}
                          >
                            Telugu
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="or enter custom language..."
                          value={quizData.language === 'English' || quizData.language === 'Telugu' ? '' : quizData.language}
                          onChange={(e) => setQuizData({ ...quizData, language: e.target.value })}
                          className="w-full bg-white/20 border border-white/40 text-[#1a1a1a] placeholder:text-black/50 px-6 py-4 rounded-2xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                        />
                      </div>
                    )}
                    {index === 1 && (
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => setQuizData({ ...quizData, topic: quizData.topic === 'Python' ? '' : 'Python' })}
                            className={`px-6 py-3 rounded-2xl font-medium text-lg transition-all ${quizData.topic === 'Python'
                              ? 'bg-[#1a1a1a] text-white shadow-xl'
                              : 'bg-white/20 border border-white/40 text-[#1a1a1a] hover:bg-white/30'
                              }`}
                          >
                            Python
                          </button>
                          <button
                            onClick={() => setQuizData({ ...quizData, topic: quizData.topic === 'C++' ? '' : 'C++' })}
                            className={`px-6 py-3 rounded-2xl font-medium text-lg transition-all ${quizData.topic === 'C++'
                              ? 'bg-[#1a1a1a] text-white shadow-xl'
                              : 'bg-white/20 border border-white/40 text-[#1a1a1a] hover:bg-white/30'
                              }`}
                          >
                            C++
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="or enter custom topic..."
                          value={quizData.topic === 'Python' || quizData.topic === 'C++' ? '' : quizData.topic}
                          onChange={(e) => setQuizData({ ...quizData, topic: e.target.value })}
                          className="w-full bg-white/20 border border-white/40 text-[#1a1a1a] placeholder:text-black/50 px-6 py-4 rounded-2xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                        />
                      </div>
                    )}
                    {index === 2 && (
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => setQuizData({ ...quizData, subtopic: quizData.subtopic === 'Strings' ? '' : 'Strings' })}
                            className={`px-6 py-3 rounded-2xl font-medium text-lg transition-all ${quizData.subtopic === 'Strings'
                              ? 'bg-[#1a1a1a] text-white shadow-xl'
                              : 'bg-white/20 border border-white/40 text-[#1a1a1a] hover:bg-white/30'
                              }`}
                          >
                            Strings
                          </button>
                          <button
                            onClick={() => setQuizData({ ...quizData, subtopic: quizData.subtopic === 'Functions' ? '' : 'Functions' })}
                            className={`px-6 py-3 rounded-2xl font-medium text-lg transition-all ${quizData.subtopic === 'Functions'
                              ? 'bg-[#1a1a1a] text-white shadow-xl'
                              : 'bg-white/20 border border-white/40 text-[#1a1a1a] hover:bg-white/30'
                              }`}
                          >
                            Functions
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="or enter custom subtopic..."
                          value={quizData.subtopic === 'Strings' || quizData.subtopic === 'Functions' ? '' : quizData.subtopic}
                          onChange={(e) => setQuizData({ ...quizData, subtopic: e.target.value })}
                          className="w-full bg-white/20 border border-white/40 text-[#1a1a1a] placeholder:text-black/50 px-6 py-4 rounded-2xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                        />
                      </div>
                    )}
                    {index === 3 && (
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => setQuizData({ ...quizData, instructions: quizData.instructions === 'Genz Tone' ? '' : 'Genz Tone' })}
                            className={`px-6 py-3 rounded-2xl font-medium text-lg transition-all ${quizData.instructions === 'Genz Tone'
                              ? 'bg-[#1a1a1a] text-white shadow-xl'
                              : 'bg-white/20 border border-white/40 text-[#1a1a1a] hover:bg-white/30'
                              }`}
                          >
                            Genz Tone
                          </button>
                          <button
                            onClick={() => setQuizData({ ...quizData, instructions: quizData.instructions === 'Chill Tone' ? '' : 'Chill Tone' })}
                            className={`px-6 py-3 rounded-2xl font-medium text-lg transition-all ${quizData.instructions === 'Chill Tone'
                              ? 'bg-[#1a1a1a] text-white shadow-xl'
                              : 'bg-white/20 border border-white/40 text-[#1a1a1a] hover:bg-white/30'
                              }`}
                          >
                            Chill Tone
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="or enter custom instructions..."
                          value={quizData.instructions === 'Genz Tone' || quizData.instructions === 'Chill Tone' ? '' : quizData.instructions}
                          onChange={(e) => setQuizData({ ...quizData, instructions: e.target.value })}
                          className="w-full bg-white/20 border border-white/40 text-[#1a1a1a] placeholder:text-black/50 px-6 py-4 rounded-2xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                        />
                      </div>
                    )}
                    {index === 4 && (
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => setQuizData({ ...quizData, knowledgeLevel: quizData.knowledgeLevel === 'Beginner' ? '' : 'Beginner' })}
                            className={`px-6 py-3 rounded-2xl font-medium text-lg transition-all ${quizData.knowledgeLevel === 'Beginner'
                              ? 'bg-[#1a1a1a] text-white shadow-xl'
                              : 'bg-white/20 border border-white/40 text-[#1a1a1a] hover:bg-white/30'
                              }`}
                          >
                            Beginner
                          </button>
                          <button
                            onClick={() => setQuizData({ ...quizData, knowledgeLevel: quizData.knowledgeLevel === 'Intermediate' ? '' : 'Intermediate' })}
                            className={`px-6 py-3 rounded-2xl font-medium text-lg transition-all ${quizData.knowledgeLevel === 'Intermediate'
                              ? 'bg-[#1a1a1a] text-white shadow-xl'
                              : 'bg-white/20 border border-white/40 text-[#1a1a1a] hover:bg-white/30'
                              }`}
                          >
                            Intermediate
                          </button>
                          <button
                            onClick={() => setQuizData({ ...quizData, knowledgeLevel: quizData.knowledgeLevel === 'Master' ? '' : 'Master' })}
                            className={`px-6 py-3 rounded-2xl font-medium text-lg transition-all ${quizData.knowledgeLevel === 'Master'
                              ? 'bg-[#1a1a1a] text-white shadow-xl'
                              : 'bg-white/20 border border-white/40 text-[#1a1a1a] hover:bg-white/30'
                              }`}
                          >
                            Master
                          </button>
                        </div>
                      </div>
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