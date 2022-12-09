import { AnswerValidation } from "../../../hexagon/models/answerValidation";
import { FetchedNextQuestionPresenter } from "./fetchedNextQuestionPresenter";

export interface FetchedNextQuestionVM {
  id: string;
  label: string;
  answers: Record<
    string,
    { label: string; highlighted: "NONE" | "RIGHT" | "WRONG" }
  >;
}

export class WithHighlightedAnswerFetchedNextQuestionVMPresenter
  implements FetchedNextQuestionPresenter<FetchedNextQuestionVM>
{
  private _fetchedQuestionVM: FetchedNextQuestionVM | null = null;

  setFetchedQuestionVM(
    id: string,
    label: string,
    answers: Record<string, string>
  ) {
    this._fetchedQuestionVM = {
      id,
      label,
      answers: Object.entries(answers).reduce((acc, [letter, label]) => {
        return {
          ...acc,
          [letter]: {
            label,
            highlighted: "NONE",
          },
        };
      }, {}),
    };
  }

  handleAnswerValidation(answerValidation: AnswerValidation): void {
    this._fetchedQuestionVM = {
      id: this._fetchedQuestionVM!.id,
      label: this._fetchedQuestionVM!.label,
      answers: Object.entries(this._fetchedQuestionVM!.answers).reduce(
        (acc, [letter, labelWithStatus]) => ({
          ...acc,
          [letter]: {
            label: labelWithStatus.label,
            highlighted:
              letter === answerValidation.rightAnswer
                ? "RIGHT"
                : answerValidation.givenAnswer === letter
                ? "WRONG"
                : "NONE",
          },
        }),
        {} as Record<
          string,
          { label: string; highlighted: "RIGHT" | "WRONG" | "NONE" }
        >
      ),
    };
  }

  getFetchedQuestionVM(): FetchedNextQuestionVM | null {
    return this._fetchedQuestionVM;
  }
}
