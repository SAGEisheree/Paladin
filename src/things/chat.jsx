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
                        Language: ${quizData.language}. Extra info: ${quizData.instructions}.
                        Ask exactly ${quizData.numQuestions} questions one by one. 
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
                    Ask ${quizData.numQuestions} questions one by one.`
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