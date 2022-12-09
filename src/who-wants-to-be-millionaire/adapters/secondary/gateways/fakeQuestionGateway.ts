import { QuestionGateway } from "../../../hexagon/gateways/questionGateway";
import { Question } from "../../../hexagon/models/question";

export class FakeQuestionGateway implements QuestionGateway {
  private _nextQuestion: Question | null = null;
  private _currentValidAnswer: string | null = null;
  private _currentQuestionIdValidated: string | null = null;

  async nextQuestion(): Promise<Question> {
    return this._nextQuestion!;
  }

  async validCurrentAnswer(
    questionId: string,
    givenAnswer: string
  ): Promise<{
    givenAnswer: string;
    rightAnswer: string;
  }> {
    this._currentQuestionIdValidated = questionId;
    return {
      givenAnswer: givenAnswer,
      rightAnswer: this._currentValidAnswer!,
    };
  }

  setNextQuestion(question: Question) {
    this._nextQuestion = question;
  }

  setCurrentAnswerValidation(rightAnswer: string) {
    this._currentValidAnswer = rightAnswer;
  }

  get currentQuestionIdValidated(): string | null {
    return this._currentQuestionIdValidated;
  }
}
