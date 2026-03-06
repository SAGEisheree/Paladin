import React, { useState, useEffect, useRef } from 'react';
import { useQuizContext } from './quizContext';
import { Send, Bot, User } from 'lucide-react';
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
    <div className="min-h-screen bg-[#57c5e8] flex flex-col">
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
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col overflow-hidden">
        {/* Progress Bar */}
        <div className="mb-4 bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-black uppercase tracking-widest opacity-60">Goal: {quizData.knowledgeLevel} Mastery</span>
            <span className="text-xs font-black">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1a1a1a] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.2)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 bg-white/20 backdrop-blur-md rounded-3xl p-6 overflow-y-auto space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black shadow-lg border border-black/5'}`}>
                {m.role === 'assistant' ? (
                  <div
                    className="markdown-content"
                    dangerouslySetInnerHTML={{ __html: marked(m.content) }}
                    style={{ lineHeight: '1.6' }}
                  />
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-black p-4 rounded-2xl shadow-lg border border-black/5 animate-pulse">
                Paladin is thinking...
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); setInput(''); }} className="mt-4 flex gap-2">
          <input
            className="flex-1 p-4 rounded-2xl bg-white/40 border-none focus:ring-2 focus:ring-black placeholder:text-black/40"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
          />
          <button type="submit" className="bg-[#1a1a1a] text-white p-4 rounded-2xl hover:scale-105 active:scale-95 transition-transform">
            <Send size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;