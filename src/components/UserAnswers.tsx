import React from "react";
import { Wrapper } from "./QuestionCard.styles";
import { answerObj } from "../App";
import { obj } from "../API";

const UserAnswers: React.FC<obj> = ({ userAnswer }) => {
  return (
    <div>
      {userAnswer.map((answer1) => (
        <Wrapper
        //   correct={answer1.correct}
        //   userClicked={answer1.correct}
          //   key={answer1}
        >
          <div>
            <span>Question</span>
            <button value={answer1.question}>{answer1.question}</button>
          </div>
          <div>
            <span>Answer</span>
            <button value={answer1.correctAnswer}>{answer1.correctAnswer}</button>
          </div>
          <div>
            <span>UserAnswer</span>
            <button value={answer1.answer}>{answer1.answer}</button>
          </div>
        </Wrapper>
      ))}
    </div>
  );
};

export default UserAnswers;
