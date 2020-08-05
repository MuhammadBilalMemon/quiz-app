import http from "./httpService";
import { apiUrl } from "../config.json";

//Types / Interfaces
import { TriviaCategory, Question } from "../models/Quiz_interfaces";

//Utils
import { suffleArray } from "./../Utils/index";

//Fetching sorted Question from API
export const fetchQuestions = async (
  QuestionNumber: number,
  difficulty: string,
  category: number
) => {
  try {
    const { data } = await http.get(
      `${apiUrl}/api.php?amount=${QuestionNumber}&category=${category}&difficulty=${difficulty}&type=multiple`
    );

    const quiz = data.results.map((question: Question) => {
      return {
        ...question,
        answers: suffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      };
    });
    return quiz;
  } catch (ex) {
    console.log("fetch Quiz Data: ", ex);
  }
};

//Fetching all categories from API
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
