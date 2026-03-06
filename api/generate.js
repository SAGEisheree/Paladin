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
                    content: `You are a Socratic tutor teaching ${quizData.topic}. 
                    Focus on ${quizData.subtopic}. Language: ${quizData.language}.
                    Ask ${quizData.numQuestions} questions one by one. 
                    Wait for an answer, review it, then ask the next.`
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