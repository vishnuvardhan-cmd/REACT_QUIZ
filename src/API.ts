import { shuffleArray } from "./utils";

export enum Diffculty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Question = {
  category: string;
  correct_answer: string;
  diffculty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Diffculty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((obj: Question) => ({
    ...obj,
    answers: shuffleArray([obj.correct_answer, ...obj.incorrect_answers]),
  }));
};
