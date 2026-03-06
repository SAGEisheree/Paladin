import React, { useState, useEffect, useRef } from 'react';
import { useQuizContext } from './quizContext';
import { Send, Bot, User } from 'lucide-react';
import Nav from './nav.jsx';
import OpenAI from "openai"; // Import it here instead
import { marked } from 'marked';

const Chat = () => {
  const { quizData, setQuizData, currentQuizId, previousQuizzes, updateQuizMessages } = useQuizContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
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
      // Priority 1: Restore existing session messages
      setMessages(session.messages);
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
                                        Language: ${quizData.language}. Extra info: ${quizData.instructions}.
                                        Ask exactly ${quizData.numQuestions} questions one by one. 
                                        **Always format your questions in bold** using **double asterisks** around the entire question.
                                        Start now by introducing yourself and asking the first question.`
              },
              { role: "user", content: "I'm ready to start the quiz!" }
            ],
          });

          const firstReply = response.choices[0].message.content;
          const initialMessages = [{ role: "assistant", content: firstReply }];
          setMessages(initialMessages);
          if (currentQuizId) updateQuizMessages(currentQuizId, initialMessages);
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
      if (currentQuizId) updateQuizMessages(currentQuizId, next);
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
                                Ask ${quizData.numQuestions} questions one by one.
                                **Always format your questions in bold** using **double asterisks** around the entire question.`
          },
          ...messages,
          userMsg
        ],
      });

      const reply = response.choices[0].message.content;
      setMessages(prev => {
        const next = [...prev, { role: "assistant", content: reply }];
        if (currentQuizId) updateQuizMessages(currentQuizId, next);
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
                Typin...
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