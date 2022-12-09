import { QuestionGateway } from "../../gateways/questionGateway";
import { FetchedNextQuestionPresenter } from "../../../adapters/primary/view-models/fetchedNextQuestionPresenter";

export class FetchNextQuestion {
  constructor(
    private questionGateway: QuestionGateway,
    private _presenter: FetchedNextQuestionPresenter<any>
  ) {}

  async handle(): Promise<void> {
    const question = await this.questionGateway.nextQuestion();
    this._presenter.setFetchedQuestionVM(
      question.id,
      question.label,
      question.answers
    );
  }

  get presenter(): FetchedNextQuestionPresenter<any> {
    return this._presenter;
  }
}
