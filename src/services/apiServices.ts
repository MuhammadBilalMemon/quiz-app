import http from "./httpService";
import { apiUrl } from "../config.json";

import { TriviaCategory } from "../models/TriviaCategory";
import { QuizObject } from "./../models/QuizObject";

export const fetchCategories = async () => {
  try {
    const {
      data: { trivia_categories },
    } = await http.get(`${apiUrl}/api_category.php`);
    const triviacategories: TriviaCategory[] = trivia_categories;
    return triviacategories;
  } catch (ex) {
    console.log("fetch Category : ", ex);
  }
};

export const fetchQuizData = async (
  currentDifficulty: string,
  currentCategory: number
) => {
  try {
    const response = await http.get<{ results: QuizObject[] }>(
      `${apiUrl}api.php?amount=10&category=${currentCategory}&difficulty=${currentDifficulty}&type=multiple`
    );

    return response.data.results;
  } catch (ex) {
    console.log("makeQuiz", ex);
  }
};
