export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuestionState = Question & { answers: string[] };

export interface SelectionType {
  numberOfQuestions: number;
  difficulty: string;
  category: number;
  categoryName: string;
}

export type selectionPropsType = {
  setNewSelection: React.Dispatch<React.SetStateAction<SelectionType>>;
  setSendRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

// Question Category
export interface TriviaCategory {
  id: number;
  name: string;
}
// Enumeration for Difficulty Level
export enum difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}
