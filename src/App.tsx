import { url } from "inspector";
import React, { useState } from "react";
//components
import QuestionCard from "./components/QuestionCard";
// types
import { QuestionState, fetchQuizQuestions, Diffculty } from "./API";
//styles
import { GlobalStyle ,Wrapper} from "./App.styles";

const TOTAL_QUESTIONS = 10;

export type answerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<answerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const triggerQuestionApi = async () => {
    setLoading(true);
    setGameOver(false);
    setQuestions(await fetchQuizQuestions(10, Diffculty.EASY));
    setScore(0);
    setNumber(0);
    setUserAnswers([]);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = answer === questions[number].correct_answer;
      if (correct) setScore((prev) => prev + 1);
      setUserAnswers((prev) => [
        ...prev,
        {
          question: questions[number].question,
          correctAnswer: questions[number].correct_answer,
          correct,
          answer,
        },
      ]);
    }
  };

  const nextQuestion = () => {
    if (number !== TOTAL_QUESTIONS - 1) {
      setNumber((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={triggerQuestionApi}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className="score">Score:{score}</p> : null}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            totalQuestions={TOTAL_QUESTIONS}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
          />
        )}
        {!loading && !gameOver && userAnswers.length === number + 1 && (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        )}
      </Wrapper>
    </>
  );
}

export default App;
