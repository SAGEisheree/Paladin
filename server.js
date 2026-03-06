import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// OpenAI client configuration
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY || 'dummy_key_for_testing',
    baseURL: "https://api.groq.com/openai/v1",
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.status(200).json({ message: 'Server is working!' });
});

// API endpoint
app.post('/api/generate', async (req, res) => {
    const { messages, quizData } = req.body;

    // Check if API key is configured
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'dummy_key_for_testing') {
        return res.status(200).json({ 
            reply: "Please add your Groq API key to the .env file. You can get one from https://console.groq.com/keys" 
        });
    }

    try {
        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are a Socratic tutor teaching ${quizData.topic}. 
                    Focus on ${quizData.subtopic}. Language: ${quizData.language}.
                    Ask ${quizData.numQuestions} questions one by one. 
                    Wait for an answer, review it, then ask the next.`
                },
                ...messages
            ],
        });

        res.status(200).json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("Groq Error:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
