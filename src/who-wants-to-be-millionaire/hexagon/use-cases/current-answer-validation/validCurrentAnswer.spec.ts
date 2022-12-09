import { ValidCurrentAnswer } from "./validCurrentAnswer";
import { FakeQuestionGateway } from "../../../adapters/secondary/gateways/fakeQuestionGateway";

describe("Current answer validation", () => {
  let validCurrentAnswer: ValidCurrentAnswer;
  let questionGateway: FakeQuestionGateway;
  const questionId = "123abc";
  const givenAnswer = "A";

  beforeEach(() => {
    questionGateway = new FakeQuestionGateway();
    validCurrentAnswer = new ValidCurrentAnswer(questionGateway);
  });

  it("should valid a right answer", async () => {
    configureNextAnswerValidation(givenAnswer);
    await expectCurrentAnswerValidation(givenAnswer, givenAnswer, "RIGHT");
  });

  it("should invalid a wrong answer", async () => {
    configureNextAnswerValidation("B");
    await expectCurrentAnswerValidation(givenAnswer, "B", "WRONG");
  });

  const configureNextAnswerValidation = (rightAnswer: string) => {
    questionGateway.setCurrentAnswerValidation(rightAnswer);
  };

  const expectCurrentAnswerValidation = async (
    givenAnswer: string,
    expectedRightAnswer: string,
    expectedAnswerStatus: string
  ) => {
    expect(await validCurrentAnswer.handle(questionId, givenAnswer)).toEqual({
      givenAnswer: givenAnswer,
      rightAnswer: expectedRightAnswer,
      status: expectedAnswerStatus,
    });
    expect(questionGateway.currentQuestionIdValidated).toEqual(questionId);
  };
});
