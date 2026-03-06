# Paladin AI Quiz App

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

3. **Start the application:**
   ```bash
   npm start
   ```
   This will start both the frontend (Vite dev server) and backend (Express server) concurrently.

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Usage

1. Go to http://localhost:5173
2. Configure your quiz settings (language, topic, subtopic, etc.)
3. Click "Go" to start the chat-based quiz
4. The AI will ask questions and review your answers using the Socratic method

## Project Structure

- `src/things/` - React components
- `src/things/chat.jsx` - Main chat interface
- `src/things/api/generate.js` - Frontend API utility (not used)
- `server.js` - Backend Express server
- `src/things/quizContext.jsx` - React context for quiz data

## Troubleshooting

- If the chat doesn't work, ensure:
  1. Your `.env` file has a valid Groq API key
  2. Both servers are running (check terminal output)
  3. No port conflicts (3001 for backend, 5173 for frontend)