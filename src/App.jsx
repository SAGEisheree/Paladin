import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './things/homePage'
import NextPage from './things/nextPage'
import QuizPage from './things/quizPage'
import { QuizProvider } from './things/quizContext';
import Chat from './things/chat';

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/next" element={<NextPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  )
}

export default App
