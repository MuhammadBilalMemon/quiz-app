import React, { useState, useEffect } from "react";
import { Select, Row, Button, Col } from "antd";

import {
  TriviaCategory,
  difficulty,
  SelectionType,
  selectionPropsType,
} from "../../models/Quiz_interfaces";

import { fetchCategories } from "../../services/apiServices";

// UI Ant Design
const { Option } = Select;

const QuizSelection: React.FC<selectionPropsType> = ({
  setNewSelection,
  setSendRequest,
}) => {
  const [categories, setCategories] = useState<TriviaCategory[]>([]);

  const [selection, setSelection] = useState<SelectionType>({
    numberOfQuestions: 10,
    difficulty: "easy",
    category: 28,
    categoryName: "Vehicles",
  });

  // Fetching Category when component Loads first Time
  useEffect(() => {
    const fetchCategory = async () => {
      const fetchedCategories = await fetchCategories();
      if (fetchedCategories) {
        setCategories(fetchedCategories);
      }
    };
    fetchCategory();
  }, []);

  // Checking categories id ready to select
  if (!categories.length) {
    return (
      <div>
        <h1 style={{ textAlign: "center", fontSize: "40px", color: "red" }}>
          Loading.....
        </h1>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setNewSelection(updateSelection);
    setSendRequest(true);
  };

  let selectedCategoryName = categories.filter((category) => {
    return category.id === selection.category;
  });

  const updateSelection: SelectionType = {
    numberOfQuestions: selection.numberOfQuestions,
    difficulty: selection.difficulty,
    category: selection.category,
    categoryName: selectedCategoryName[0].name,
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row justify="center" align="middle">
        <Col style={{ margin: "1rem" }}>
          <Select
            size="middle"
            style={{ width: "220px" }}
            placeholder="Random"
            defaultValue={selection.category}
            onChange={(e) =>
              setSelection({
                ...selection,
                category: Number(e),
              })
            }
          >
            {categories.map((category) => (
              <Option value={category.id} key={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col style={{ margin: "1rem" }}>
          <Select
            size="middle"
            style={{ width: "220px" }}
            placeholder="Select you category"
            defaultValue={difficulty.Easy}
            onChange={(e) =>
              setSelection({ ...selection, difficulty: String(e) })
            }
          >
            <Option value={difficulty.Easy}>Easy</Option>
            <Option value={difficulty.Medium}>Medium</Option>
            <Option value={difficulty.Hard}>Hard</Option>
          </Select>
        </Col>
      </Row>
      <Row justify="center">
        <Col style={{ marginTop: "1rem" }}>
          <Button
            htmlType="button"
            type="primary"
            size="middle"
            danger
            onClick={(e) => handleSubmit(e)}
          >
            Start Your Quiz
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default QuizSelection;
