import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
    const [quizData, setQuizData] = useState(() => {
        const saved = localStorage.getItem('paladin_current_config');
        return saved ? JSON.parse(saved) : { language: '', topic: '', subtopic: '', instructions: '', numQuestions: '' };
    });

    const [previousQuizzes, setPreviousQuizzes] = useState(() => {
        const saved = localStorage.getItem('paladin_history');
        return saved ? JSON.parse(saved) : [];
    });

    const [currentQuizId, setCurrentQuizId] = useState(() => {
        return localStorage.getItem('paladin_current_id');
    });

    // Sync helpers that update both state and localStorage immediately
    const addQuiz = useCallback((newQuiz) => {
        setPreviousQuizzes(prev => {
            const updated = [newQuiz, ...prev];
            localStorage.setItem('paladin_history', JSON.stringify(updated));
            return updated;
        });
        setCurrentQuizId(newQuiz.id);
        localStorage.setItem('paladin_current_id', newQuiz.id);
        setQuizData(newQuiz.config);
        localStorage.setItem('paladin_current_config', JSON.stringify(newQuiz.config));
    }, []);

    const updateQuizMessages = useCallback((quizId, messages) => {
        setPreviousQuizzes(prev => {
            const updated = prev.map(quiz => quiz.id === quizId ? { ...quiz, messages } : quiz);
            localStorage.setItem('paladin_history', JSON.stringify(updated));
            return updated;
        });
    }, []);

    const deleteQuiz = useCallback((quizId) => {
        setPreviousQuizzes(prev => {
            const updated = prev.filter(quiz => quiz.id !== quizId);
            localStorage.setItem('paladin_history', JSON.stringify(updated));
            return updated;
        });
        if (currentQuizId === quizId) {
            setCurrentQuizId(null);
            localStorage.removeItem('paladin_current_id');
        }
    }, [currentQuizId]);

    const selectSession = useCallback((quiz) => {
        setCurrentQuizId(quiz.id);
        localStorage.setItem('paladin_current_id', quiz.id);
        setQuizData(quiz.config);
        localStorage.setItem('paladin_current_config', JSON.stringify(quiz.config));
    }, []);

    const resetQuiz = useCallback(() => {
        const empty = { language: '', topic: '', subtopic: '', instructions: '', numQuestions: '' };
        setQuizData(empty);
        localStorage.removeItem('paladin_current_config');
        setCurrentQuizId(null);
        localStorage.removeItem('paladin_current_id');
    }, []);

    return (
        <QuizContext.Provider value={{
            quizData,
            setQuizData,
            previousQuizzes,
            currentQuizId,
            setCurrentQuizId,
            addQuiz,
            updateQuizMessages,
            deleteQuiz,
            selectSession,
            resetQuiz
        }}>
            {children}
        </QuizContext.Provider>
    );
};
