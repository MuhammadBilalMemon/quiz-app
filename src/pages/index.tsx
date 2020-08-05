import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";

// API Services
import { fetchQuestions } from "./../services/apiServices";

// TypeScript Interfaces
import { SelectionType, QuestionState } from "../models/Quiz_interfaces";

// Components
import QuizSelection from "../components/QuizSelection";
import QuestionCard from "../components/QuestionCard";

const TOTAL_QUESTIONS = 3;
// Solved
export type SelectedObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const HomePage = () => {
  //questions
  const [questionOptions, setQuestionsOptions] = useState<QuestionState[]>([]);
  //number of questions
  // Solved
  const [QuestionsCount, setQuestionsCount] = useState<number>(0);

  const [AnswerCount, setAnswerCount] = useState<number>(0);
  const [SelectedAnswers, setSelectedAnswers] = useState<SelectedObject[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

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
    setGameOver(false);
  }, [newSelection, sendRequest]);

  const checkAnswer = (e: any) => {
    const answer = e.target.value;
    const correct = questionOptions[QuestionsCount].correct_answer === answer;
    if (correct) {
      setAnswerCount((prev) => prev + 1);
    }
    const SelectedObject = {
      question: questionOptions[QuestionsCount].question,
      answer,
      correct,
      correctAnswer: questionOptions[QuestionsCount].correct_answer,
    };

    setSelectedAnswers((prev) => [...prev, SelectedObject]);
  };

  const nextQuestion = () => {
    const nextCount = QuestionsCount + 1;
    if (nextCount === TOTAL_QUESTIONS) {
      setGameOver(true);
      // setAnswerCount(0);
      setSelectedAnswers([]);
      setQuestionsCount(0);
    } else {
      setQuestionsCount(nextCount);
    }
  };

  return (
    <>
      {questionOptions.length ? (
        gameOver ? (
          <>
            <Row justify="center" style={{ marginTop: "1rem" }}>
              <Col>
                <h1 style={{ color: "red" }}>
                  Your Score is Score: {AnswerCount}
                </h1>
              </Col>
            </Row>

            <QuizSelection
              setNewSelection={setNewSelection}
              setSendRequest={setSendRequest}
            />
          </>
        ) : (
          <QuestionCard
            questionNo={QuestionsCount + 1}
            question={questionOptions[QuestionsCount].question}
            answers={questionOptions[QuestionsCount].answers}
            totalQuestions={TOTAL_QUESTIONS}
            score={AnswerCount}
            selectedAnswer={
              SelectedAnswers ? SelectedAnswers[QuestionsCount] : undefined
            }
            checkAnswer={checkAnswer}
            nextQuestion={nextQuestion}
          />
        )
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
