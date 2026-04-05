import { useState, useCallback } from 'react';
import { KundaliType, QuizQuestion } from '../types';
import { getQuizQuestions, calculateKundaliType } from '../utils/personalityQuiz';

export function useQuiz() {
  const [questions] = useState<QuizQuestion[]>(getQuizQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [kundaliResult, setKundaliResult] = useState<KundaliType | null>(null);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const totalQuestions = questions.length;
  const progress = Math.round(((currentQuestion + 1) / totalQuestions) * 100);

  /**
   * Select an answer and move to next question
   */
  const selectAnswer = useCallback(
    (answerIndex: number) => {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answerIndex;
      setAnswers(newAnswers);

      // Move to next question or complete quiz
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        completeQuiz(newAnswers);
      }
    },
    [currentQuestion, answers, totalQuestions]
  );

  /**
   * Go to previous question
   */
  const goToPrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }, [currentQuestion]);

  /**
   * Calculate final Kundali type and complete quiz
   */
  const completeQuiz = useCallback((finalAnswers: number[]) => {
    // Filter out unanswered questions
    const allAnswered = finalAnswers.every((a) => a !== -1);

    if (!allAnswered) {
      alert('Please answer all questions before completing the quiz.');
      return;
    }

    const result = calculateKundaliType(finalAnswers);
    setKundaliResult(result);
    setIsQuizComplete(true);
  }, []);

  /**
   * Reset quiz to start over
   */
  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(-1));
    setKundaliResult(null);
    setIsQuizComplete(false);
  }, [questions.length]);

  /**
   * Skip to end and calculate result from current answers
   */
  const skipToEnd = useCallback(() => {
    completeQuiz(answers);
  }, [answers, completeQuiz]);

  const getCurrentQuestion = () => questions[currentQuestion];

  return {
    // State
    currentQuestion,
    questions,
    totalQuestions,
    answers,
    kundaliResult,
    isQuizComplete,
    progress,

    // Actions
    selectAnswer,
    goToPrevious,
    skipToEnd,
    resetQuiz,
    getCurrentQuestion,
  };
}
