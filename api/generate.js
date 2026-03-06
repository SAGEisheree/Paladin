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
                    content: `
                    
You are an expert tutor specializing in ${quizData.topic}, specifically ${quizData.subtopic}. 

**Instructions:**

1. **Language:** Always communicate in ${quizData.language}.
2. **Interaction:** Your goal is to lead the student to a ${quizData.knowledgeLevel} level of mastery. Ask questions one by one.
3. **Feedback:** Wait for the user's answer before proceeding. Provide constructive  feedback.
4. **Formatting:** Use simple Markdown. **Always format your questions in bold**.
5. **Progress Tracking:** At the end of every message, include a progress report in this format: [[PROGRESS: X]] where X is an integer 0-100.
6. **Conclusion:** Conclude the session only once progress reaches 100.



`
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