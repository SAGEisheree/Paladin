import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
    const [quizData, setQuizData] = useState(() => {
        const saved = localStorage.getItem('paladin_current_config');
        return saved ? JSON.parse(saved) : { language: '', topic: '', subtopic: '', instructions: '', knowledgeLevel: '' };
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

    const updateQuizSession = useCallback((quizId, updates) => {
        setPreviousQuizzes(prev => {
            const updated = prev.map(quiz => quiz.id === quizId ? { ...quiz, ...updates } : quiz);
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
        const empty = { language: '', topic: '', subtopic: '', instructions: '', knowledgeLevel: '' };
        setQuizData(empty);
        localStorage.removeItem('paladin_current_config');
        setCurrentQuizId(null);
        localStorage.removeItem('paladin_current_id');
    }, []);

    const streak = React.useMemo(() => {
        if (!previousQuizzes || previousQuizzes.length === 0) return 0;

        const getLocalDateString = (date) => {
            const d = new Date(date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        };

        const activityDates = new Set(previousQuizzes.map(q => getLocalDateString(q.date)));

        const today = new Date();
        const todayStr = getLocalDateString(today);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = getLocalDateString(yesterday);

        // If no activity today AND no activity yesterday, streak is broken
        if (!activityDates.has(todayStr) && !activityDates.has(yesterdayStr)) {
            return 0;
        }

        let streakCount = 0;
        let checkDate = new Date();

        // If today is skipped, start counting from yesterday
        if (!activityDates.has(todayStr)) {
            checkDate.setDate(checkDate.getDate() - 1);
        }

        while (activityDates.has(getLocalDateString(checkDate))) {
            streakCount++;
            checkDate.setDate(checkDate.getDate() - 1);
        }

        return streakCount;
    }, [previousQuizzes]);

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    return (
        <QuizContext.Provider value={{
            quizData,
            setQuizData,
            previousQuizzes,
            currentQuizId,
            setCurrentQuizId,
            addQuiz,
            updateQuizSession,
            deleteQuiz,
            selectSession,
            resetQuiz,
            streak,
            isShareModalOpen,
            setIsShareModalOpen
        }}>
            {children}
        </QuizContext.Provider>
    );
};
