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
        content: `You are an expert tutor specializing in ${quizData.topic}, specifically ${quizData.subtopic}. 

**Instructions:**
1. **Language:** Always communicate in ${quizData.language}.
2. **Interaction:** Ask exactly ${quizData.numQuestions} questions, one by one. Do not ask multiple questions at once.
3. **Feedback:** Wait for the user's answer before proceeding. If the answer is incorrect or could be improved, provide constructive, encouraging feedback and explain the reasoning clearly before moving to the next question.
4. **Formatting:** Use simple Markdown. **Always format your questions in bold** using **double asterisks** around the entire question. Use bold for key terms or emphasis in explanations as well.
5. **Spacing:** Start every question with exactly three new lines (\n\n\n) to ensure proper separation on the website.`
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