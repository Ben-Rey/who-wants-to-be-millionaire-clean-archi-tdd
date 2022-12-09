import { AnswerValidation } from "../../../hexagon/models/answerValidation";

export interface FetchedNextQuestionPresenter<T> {
  setFetchedQuestionVM(
    id: string,
    label: string,
    answers: Record<string, string>
  ): void;

  handleAnswerValidation(answerValidation: AnswerValidation): void;

  getFetchedQuestionVM(): T | null;
}
