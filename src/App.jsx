import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './things/homePage'
import NextPage from './things/nextPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/next" element={<NextPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
