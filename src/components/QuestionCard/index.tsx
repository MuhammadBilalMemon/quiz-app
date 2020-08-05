import React from "react";
import { Row, Col, Divider, Card, Radio, Button } from "antd";

type Props = {
  question: string;
  answers: string[];
  questionNo: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  questionNo,
  totalQuestions,
}) => {
  return (
    <>
      <Row justify="center" align="middle">
        <Card bordered={true} style={{ minHeight: "15rem", padding: "3rem" }}>
          <Row justify="center" align="middle">
            <Col>
              <Divider
                orientation="center"
                style={{
                  color: "#333",
                  fontWeight: "normal",
                  fontSize: "1.2rem",
                }}
              >
                Question: {questionNo} / {totalQuestions}
              </Divider>
            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: "1rem" }}>
            <Col>
              <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
                <span style={{ fontWeight: "bold" }}>Question: </span>
                <span dangerouslySetInnerHTML={{ __html: question }} />
              </p>
            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: "1rem" }}>
            <Col>
              <Radio.Group
                style={{ textAlign: "center" }}
                buttonStyle="outline"
                optionType="button"
              >
                {answers.map((answer) => (
                  <Radio.Button key={answer} value={answer}>
                    <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Col>
          </Row>
          {}
          <Row justify="center" style={{ marginTop: "1rem" }}>
            <Col>
              <Button htmlType="button" type="primary" size="middle" danger>
                Next
              </Button>
            </Col>
          </Row>
        </Card>
      </Row>
    </>
  );
};

export default QuestionCard;
