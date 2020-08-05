import React, { useEffect, useState } from "react";
// API Services
import { fetchQuestions } from "./../services/apiServices";

// TypeScript Interfaces
import { SelectionType, QuestionState } from "../models/Quiz_interfaces";

// Components
import QuizSelection from "../components/QuizSelection";
import QuestionCard from "../components/QuestionCard";

const TOTAL_QUESTIONS = 10;

const HomePage = () => {
  //questions
  const [questionOptions, setQuestionsOptions] = useState<QuestionState[]>([]);
  //number of questions
  const [QuestionsCount, setQuestionsCount] = useState<number>(0);

  ////////////////////////////////////////////////////////////////////////////////////////
  const [sendRequest, setSendRequest] = useState<boolean>(false);
  const [newSelection, setNewSelection] = useState<SelectionType>({
    numberOfQuestions: TOTAL_QUESTIONS,
    difficulty: "",
    category: 9,
    categoryName: "",
  });

  useEffect(() => {
    const fetchQues = async () => {
      if (sendRequest) {
        const fetchedData = await fetchQuestions(
          newSelection.numberOfQuestions,
          newSelection.difficulty,
          newSelection.category
        );
        if (fetchedData) {
          setQuestionsOptions(fetchedData);
        }
      }
    };

    fetchQues();
  }, [newSelection, sendRequest]);

  return (
    <>
      {questionOptions.length ? (
        <QuestionCard
          questionNo={QuestionsCount + 1}
          question={questionOptions[QuestionsCount].question}
          answers={questionOptions[QuestionsCount].answers}
          totalQuestions={TOTAL_QUESTIONS}
        />
      ) : (
        <QuizSelection
          setNewSelection={setNewSelection}
          setSendRequest={setSendRequest}
        />
      )}
    </>
  );
};

export default HomePage;
