import React, { useState, useEffect, useRef } from 'react';
import { useQuizContext } from './quizContext';
import { Send, Bot, User, Brain } from 'lucide-react';
import Nav from './nav.jsx';
import OpenAI from "openai"; // Import it here instead
import { marked } from 'marked';

const Chat = () => {
  const { quizData, setQuizData, currentQuizId, previousQuizzes, updateQuizSession } = useQuizContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef(null);
  const isFirstRun = useRef(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Initialize Groq Client
  const client = new OpenAI({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
    dangerouslyAllowBrowser: true,
  });

  // Handle history loading & initialization
  useEffect(() => {
    if (!isFirstRun.current) return;

    const session = previousQuizzes.find(q => q.id === currentQuizId);

    if (session && session.messages.length > 0) {
      // Priority 1: Restore existing session messages and progress
      setMessages(session.messages);
      setProgress(session.progress || 0);
      if (!quizData.topic) setQuizData(session.config);
      isFirstRun.current = false;
    } else if (quizData.topic) {
      // Priority 2: Start fresh if we have active config
      const startQuiz = async () => {
        setLoading(true);
        try {
          const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: `You are a Socratic tutor teaching ${quizData.topic} (${quizData.subtopic}). 
                                        Target Goal: Reach ${quizData.knowledgeLevel} level of mastery.
                                        Language: ${quizData.language}. Extra info: ${quizData.instructions}.
                                        
                                        Your Goal:
                                        1. Guide the student using Socratic questioning.
                                        2. Periodically assess their understanding.
                                        3. **At the end of EVERY response, you MUST include a progress update in this EXACT format: [[PROGRESS: X]] where X is an integer from 0 to 100 representing how close they are to the ${quizData.knowledgeLevel} goal.**
                                        4. When progress reaches 100, congratulate them and conclude the session.
                                        
                                        **Always format your questions in bold** using **double asterisks**.
                                        Start now by introducing yourself and asking the first question.`
              },
              { role: "user", content: "I'm ready to start the quiz!" }
            ],
          });

          const firstReply = response.choices[0].message.content;

          // Parse progress from AI response
          const progressMatch = firstReply.match(/\[\[PROGRESS:\s*(\d+)\]\]/);
          const nextProgress = progressMatch ? parseInt(progressMatch[1]) : progress;
          if (progressMatch) {
            setProgress(nextProgress);
          }

          const cleanReply = firstReply.replace(/\[\[PROGRESS:\s*\d+\]\]/g, '').trim();
          const initialMessages = [{ role: "assistant", content: cleanReply }];
          setMessages(initialMessages);

          if (currentQuizId) {
            updateQuizSession(currentQuizId, {
              messages: initialMessages,
              progress: nextProgress
            });
          }
          isFirstRun.current = false;
        } catch (err) {
          console.error("Failed to start quiz:", err);
        } finally {
          setLoading(false);
        }
      };
      startQuiz();
    }
  }, [currentQuizId, quizData.topic, previousQuizzes]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { role: "user", content: text };

    // Use functional update to ensure we always have the latest history
    setMessages(prev => {
      const next = [...prev, userMsg];
      if (currentQuizId) updateQuizSession(currentQuizId, { messages: next });
      return next;
    });

    setLoading(true);

    try {
      const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a Socratic tutor teaching ${quizData.topic}. 
                                Focus on ${quizData.subtopic}. Language: ${quizData.language}.
                                Goal: Reach ${quizData.knowledgeLevel} mastery.
                                **At the end of EVERY response, include: [[PROGRESS: X]]** where X is 0-100.
                                **Always format questions in bold**.`
          },
          ...messages,
          userMsg
        ],
      });

      const reply = response.choices[0].message.content;

      // Parse progress
      const progressMatch = reply.match(/\[\[PROGRESS:\s*(\d+)\]\]/);
      const nextProgress = progressMatch ? parseInt(progressMatch[1]) : progress;
      if (progressMatch) {
        setProgress(nextProgress);
      }

      const cleanReply = reply.replace(/\[\[PROGRESS:\s*\d+\]\]/g, '').trim();
      setMessages(prev => {
        const next = [...prev, { role: "assistant", content: cleanReply }];
        if (currentQuizId) {
          updateQuizSession(currentQuizId, {
            messages: next,
            progress: nextProgress
          });
        }
        return next;
      });
    } catch (err) {
      console.error("Groq Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#57c5e8] flex flex-col overflow-hidden">
      <style>{`
                .markdown-content h1, .markdown-content h2, .markdown-content h3 { font-weight: bold; margin: 1em 0 0.5em 0; }
                .markdown-content h1 { font-size: 1.5em; }
                .markdown-content h2 { font-size: 1.3em; }
                .markdown-content h3 { font-size: 1.1em; }
                .markdown-content p { margin: 0.5em 0; }
                .markdown-content strong { font-weight: bold; }
                .markdown-content em { font-style: italic; }
                .markdown-content ul, .markdown-content ol { margin: 0.5em 0; padding-left: 1.5em; }
                .markdown-content li { margin: 0.25em 0; }
                .markdown-content code { background-color: rgba(0,0,0,0.1); padding: 0.2em 0.4em; border-radius: 0.25em; font-family: monospace; }
                .markdown-content pre { background-color: rgba(0,0,0,0.1); padding: 1em; border-radius: 0.5em; overflow-x: auto; margin: 0.5em 0; }
                .markdown-content pre code { background-color: transparent; padding: 0; }
            `}</style>
      <Nav />
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 pb-4 flex flex-col lg:flex-row gap-6 overflow-hidden relative">

        {/* Mobile Header: Progress Indicator (Visible only on small screens) */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Progress</span>
            <span className="text-xl font-black text-white">{progress}%</span>
          </div>
          <div className="flex-1 mx-4 h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest opacity-60 text-right">
            {quizData.knowledgeLevel}
          </div>
        </div>

        {/* Left Side: Chat Window */}
        <div className="flex-[3] flex flex-col min-w-0 relative h-full">
          <div className="flex-1 bg-white/20 backdrop-blur-md rounded-[2.5rem] p-4 md:p-6 overflow-y-auto space-y-4 shadow-xl border border-white/30 custom-scrollbar mb-20 md:mb-24">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] md:max-w-[85%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black shadow-lg border border-black/5'}`}>
                  {m.role === 'assistant' ? (
                    <div
                      className="markdown-content text-sm md:text-base"
                      dangerouslySetInnerHTML={{ __html: marked(m.content) }}
                      style={{ lineHeight: '1.6' }}
                    />
                  ) : (
                    <span className="text-sm md:text-base">{m.content}</span>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-black p-4 rounded-2xl shadow-lg border border-black/5 animate-pulse text-sm md:text-base">
                  Paladin is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Absolute Input Container - Pins to bottom of the relative parent */}
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); setInput(''); }}
            className="absolute bottom-0 left-0 right-0 p-2 md:py-4 flex gap-2 md:gap-3 bg-transparent z-10"
          >
            <input
              className="flex-1 p-4 md:p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 focus:ring-2 focus:ring-black placeholder:text-black/40 text-base md:text-lg shadow-2xl"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
            />
            <button type="submit" className="bg-[#1a1a1a] text-white px-5 md:px-8 rounded-3xl hover:scale-105 active:scale-95 transition-transform shadow-2xl flex items-center justify-center">
              <Send size={20} className="md:w-6 md:h-6" />
            </button>
          </form>
        </div>

        {/* Right Side: Progress Sidebar - Hidden on mobile, shown on lg */}
        <div className="flex-1 min-w-[320px] hidden lg:flex flex-col gap-6 relative h-full">
          <div className="bg-[#1a1a1a] text-white rounded-[2.5rem] p-8 shadow-2xl border border-white/10 flex flex-col shrink-0">
            <div className="inline-block bg-[#57c5e8]/20 text-[#57c5e8] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 w-fit">
              Mastery Analysis
            </div>
            <h3 className="text-3xl font-black mb-6 tracking-tighter leading-none">
              Knowledge <br />
              <span className="text-[#57c5e8]">Progress</span>
            </h3>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="text-xs font-bold opacity-40 uppercase tracking-widest">Level</div>
                <div className="text-lg font-black">{quizData.knowledgeLevel}</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold opacity-40 uppercase tracking-widest">Completion</span>
                  <span className="text-2xl font-black text-[#57c5e8]">{progress}%</span>
                </div>
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden border border-white/5 p-[2px]">
                  <div
                    className="h-full bg-[#57c5e8] rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(87,197,232,0.5)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>


            </div>
          </div>

          {/* Quick Info Card */}

        </div>
      </div>
    </div>
  );
};

export default Chat;