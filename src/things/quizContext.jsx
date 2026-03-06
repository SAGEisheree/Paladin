import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
    const [quizData, setQuizData] = useState({
        language: '',
        topic: '',
        subtopic: '',
        instructions: '',
        numQuestions: ''
    });

    return (
        <QuizContext.Provider value={{ quizData, setQuizData }}>
            {children}
        </QuizContext.Provider>
    );
};
