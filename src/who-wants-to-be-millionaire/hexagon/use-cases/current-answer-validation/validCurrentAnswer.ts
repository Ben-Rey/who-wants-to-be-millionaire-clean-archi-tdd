import { QuestionGateway } from "../../gateways/questionGateway";
import { AnswerValidation } from "../../models/answerValidation";

export class ValidCurrentAnswer {
  constructor(private questionGateway: QuestionGateway) {}

  async handle(
    questionId: string,
    givenAnswer: string
  ): Promise<AnswerValidation> {
    const validation = await this.questionGateway.validCurrentAnswer(
      questionId,
      givenAnswer
    );
    return {
      givenAnswer: validation.givenAnswer,
      rightAnswer: validation.rightAnswer,
      status:
        validation.givenAnswer === validation.rightAnswer ? "RIGHT" : "WRONG",
    };
  }
}
