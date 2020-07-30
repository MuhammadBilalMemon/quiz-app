import React from "react";
import { Select, Row, Button, Col } from "antd";

import { TriviaCategory } from "../../models/TriviaCategory";
import { difficulty } from "../../models/DifficultyLevel";

const { Option } = Select;

interface Props {
  triviaCategories: TriviaCategory[];
}

const QuizSelection: React.FC<Props> = ({ triviaCategories }) => {
  return (
    <form action="">
      <Row justify="center" align="middle">
        <Col style={{ margin: "1rem" }}>
          <Select
            size="middle"
            style={{ width: "220px" }}
            placeholder="Random"
            defaultValue={undefined}
          >
            {triviaCategories.map((category) => (
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
          >
            {}
            <Option value={difficulty.Easy}>Easy</Option>
            <Option value={difficulty.Medium}>Medium</Option>
            <Option value={difficulty.Hard}>Hard</Option>
          </Select>
        </Col>
      </Row>
      <Row justify="center">
        <Col style={{ marginTop: "1rem" }}>
          <Button htmlType="button" type="primary" size="middle" danger>
            Start Quiz
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default QuizSelection;
