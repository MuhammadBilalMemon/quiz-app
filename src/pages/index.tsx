import React, { useEffect, useState } from "react";
import QuizSelection from "../components/QuizSelection";
import { fetchCategories } from "./../services/apiServices";
import { TriviaCategory } from "../models/TriviaCategory";

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<TriviaCategory[]>([]);

  useEffect(() => {
    const getCategory = async () => {
      const gotCategories = await fetchCategories();

      if (gotCategories) {
        setCategories(gotCategories);
      }
    };

    getCategory();
  }, []);

  return (
    <>
      <QuizSelection triviaCategories={categories} />
    </>
  );
};

export default HomePage;
