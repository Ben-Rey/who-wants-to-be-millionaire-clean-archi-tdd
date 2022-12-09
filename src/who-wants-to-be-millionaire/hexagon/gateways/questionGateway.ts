import { Question } from "../models/question";

export interface QuestionGateway {
  nextQuestion(): Promise<Question>;

  validCurrentAnswer(
    questionId: string,
    givenAnswer: string
  ): Promise<{
    givenAnswer: string;
    rightAnswer: string;
  }>;
}
