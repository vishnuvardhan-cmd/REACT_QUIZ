import React from "react";
import { answerObj } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

type quiz = {
  question: string;
  answers: string[];
  questionNr: number;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: answerObj | undefined;
  totalQuestions: number;
};

const QuestionCard: React.FC<quiz> = ({
  question,
  answers,
  questionNr,
  callback,
  userAnswer,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question : {questionNr}/{totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => (
          <ButtonWrapper
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
            key={answer}
          >
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
