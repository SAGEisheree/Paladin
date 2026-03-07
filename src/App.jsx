import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './things/homePage'
import NextPage from './things/nextPage'
import QuizPage from './things/quizPage'
import About from './things/about'
import { QuizProvider } from './things/quizContext';
import Chat from './things/chat';
import ShareModal from './things/shareModal';

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/next" element={<NextPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <ShareModal />
      </BrowserRouter>
    </QuizProvider>
  )
}

export default App
