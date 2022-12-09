import { FetchNextQuestion } from "./fetchNextQuestion";
import { FakeQuestionGateway } from "../../../adapters/secondary/gateways/fakeQuestionGateway";
import { Question } from "../../models/question";
import { FetchedNextQuestionPresenter } from "../../../adapters/primary/view-models/fetchedNextQuestionPresenter";
import { AnswerValidation } from "../../models/answerValidation";

describe("Current question fetching", () => {
  let questionGateway: FakeQuestionGateway;
  let fetchNextQuestion: FetchNextQuestion;
  let presenter: PassiveFetchedNextPresenter;

  beforeEach(() => {
    questionGateway = new FakeQuestionGateway();
    fetchNextQuestion = new FetchNextQuestion(questionGateway, presenter);
  });

  it("should fetch the next question with four answers", async () => {
    initializeTheGameWithOneQuestion(sampleQuestion);
    await fetchNextQuestion.handle();
    expectNextQuestion(
      fetchNextQuestion.presenter.getFetchedQuestionVM(),
      sampleQuestion
    );
  });

  const initializeTheGameWithOneQuestion = (question: Question) => {
    questionGateway.setNextQuestion(question);
  };

  const expectNextQuestion = (
    actualQuestion: Question,
    expectedQuestion: Question
  ) => expect(actualQuestion).toEqual(expectedQuestion);

  const sampleQuestion = {
    id: "123abc",
    label: "Que signifie l'acronyme TDD ?",
    answers: {
      A: "Third-Driven Development",
      B: "Test-Driven Development",
      C: "Test-Deep Development",
      D: "Test-Driven Design",
    },
  };
});

class PassiveFetchedNextPresenter
  implements FetchedNextQuestionPresenter<Question>
{
  private _fetchedNextQuestionVM: Question | null = null;

  setFetchedQuestionVM(
    id: string,
    label: string,
    answers: Record<string, string>
  ) {
    this._fetchedNextQuestionVM = {
      id,
      label,
      answers,
    };
  }

  handleAnswerValidation(answerValidation: AnswerValidation): () => void {
    throw new Error("Method not implemented.");
  }

  getFetchedQuestionVM(): Question | null {
    return this._fetchedNextQuestionVM;
  }
}
