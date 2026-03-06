# homePage.jsx
```jsx
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
```

# nextPage.jsx
```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Nav from './nav.jsx';
import { BookOpen, GraduationCap, Book } from 'lucide-react';
import { useQuizContext } from './quizContext';

const NextPage = () => {
  const [activeTab, setActiveTab] = useState('Pick a Language');
  const { quizData, setQuizData } = useQuizContext();
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
                        value={quizData.language}
                        onChange={(e) => setQuizData({ ...quizData, language: e.target.value })}
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
                        value={quizData.topic}
                        onChange={(e) => setQuizData({ ...quizData, topic: e.target.value })}
                        className="w-full bg-white/20 border border-white/40 text-[#1a1a1a] placeholder:text-black/50 px-6 py-4 rounded-2xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                      />
                    )}
                    {index === 2 && (
                      <input
                        type="text"
                        placeholder="e.g., Binary Trees"
                        value={quizData.subtopic}
                        onChange={(e) => setQuizData({ ...quizData, subtopic: e.target.value })}
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
```

# chat.jsx
```jsx
import React, { useState, useEffect, useRef } from 'react';
import { useQuizContext } from './quizContext';
import { Send, Bot, User } from 'lucide-react';
import Nav from './nav.jsx';
import OpenAI from "openai"; // Import it here instead

const Chat = () => {
  const { quizData } = useQuizContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);


  // Add this inside your Chat component
  useEffect(() => {
    // Only start if we have quizData and haven't started yet
    if (messages.length === 0 && quizData.topic) {
      const startQuiz = async () => {
        setLoading(true);
        try {
          const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: `You are a Socratic tutor teaching ${quizData.topic} (${quizData.subtopic}). 
                        Language: ${quizData.language}. 
                        Ask questions one by one to help the user learn through Socratic dialogue.
                        Start now by introducing yourself and asking the first question.`
              },
              { role: "user", content: "I'm ready to start the quiz!" }
            ],
          });

          const firstReply = response.choices[0].message.content;
          setMessages([{ role: "assistant", content: firstReply }]);
        } catch (err) {
          console.error("Failed to start quiz:", err);
        } finally {
          setLoading(false);
        }
      };

      startQuiz();
    }
  }, [quizData]); // This ensures it runs once the data is ready


  // Initialize Groq Client directly in Frontend
  const client = new OpenAI({
    apiKey: import.meta.env.VITE_GROQ_API_KEY, // Use the VITE_ prefix
    baseURL: "https://api.groq.com/openai/v1",
    dangerouslyAllowBrowser: true, // Required for frontend-only calls
  });

  const sendMessage = async (text) => {
    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a Socratic tutor teaching ${quizData.topic}. 
                    Focus on ${quizData.subtopic}. Language: ${quizData.language}.
                    Continue the Socratic dialogue by asking follow-up questions as needed.`
          },
          ...updatedMessages
        ],
      });

      const reply = response.choices[0].message.content;
      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Groq Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ... (keep the rest of your return JSX the same)

  return (
    <div className="min-h-screen bg-[#57c5e8] flex flex-col">
      <Nav />
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col overflow-hidden">
        <div className="flex-1 bg-white/20 backdrop-blur-md rounded-3xl p-6 overflow-y-auto space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}>
                {m.content}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); setInput(''); }} className="mt-4 flex gap-2">
          <input
            className="flex-1 p-4 rounded-2xl bg-white/40 border-none focus:ring-2 focus:ring-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
          />
          <button type="submit" className="bg-[#1a1a1a] text-white p-4 rounded-2xl">
            <Send size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
```

# nav.jsx
```jsx
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
        <a href="#" className="hover:opacity-70 transition">For Learners</a>
      </div>
      <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-2 rounded-full font-bold transition">
        Learn more
      </button>
    </nav>
  )
}

export default Nav
```

# quizContext.jsx
```jsx
import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
    const [quizData, setQuizData] = useState({
        language: '',
        topic: '',
        subtopic: ''
    });

    return (
        <QuizContext.Provider value={{ quizData, setQuizData }}>
            {children}
        </QuizContext.Provider>
    );
};
```

# tasks.jsx
```jsx
import React from 'react'

const tasks = () => {
  return (
    <div>tasks</div>
  )
}

export default tasks
```

# generate.js
```javascript
// api/generate.js
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { messages, quizData } = req.body;

    try {
        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile", // Use a valid Groq model ID
            messages: [
                {
        role: "system",
        content: `You are an expert Socratic tutor specializing in ${quizData.topic}, specifically ${quizData.subtopic}. 
  
        **Instructions:**
        1. Language: Always communicate in ${quizData.language}.
        2. Interaction: Ask exactly ${quizData.numQuestions} questions, one by one. Do not ask multiple questions at once.
         3. Feedback: Wait for the user's answer before proceeding. If the answer is incorrect or could be improved, provide constructive, encouraging feedback and explain the reasoning clearly before moving to the next question.
         4. Formatting: Use simple Markdown. Use **bold** for key terms or emphasis, and keep your explanations concise and easy to understand.`
                },
                ...messages // This passes the chat history
            ],
        });

        res.status(200).json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("Groq Error:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
}
```