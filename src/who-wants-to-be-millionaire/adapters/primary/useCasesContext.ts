import { FakeQuestionGateway } from "../secondary/gateways/fakeQuestionGateway";
import React from "react";
import { FetchNextQuestion } from "../../hexagon/use-cases/current-question-fetching/fetchNextQuestion";
import { ValidCurrentAnswer } from "../../hexagon/use-cases/current-answer-validation/validCurrentAnswer";
import { WithHighlightedAnswerFetchedNextQuestionVMPresenter } from "./view-models/withHighlightedAnswerFetchedNextQuestionVMPresenter";

interface UseCases {
  fetchNextQuestion: FetchNextQuestion | null;
  validCurrentAnswer: ValidCurrentAnswer | null;
}

export const UseCasesContext = React.createContext<UseCases>({
  fetchNextQuestion: null,
  validCurrentAnswer: null,
});

const questionGateway = new FakeQuestionGateway();
const fetchedNextQuestionVMPresenter =
  new WithHighlightedAnswerFetchedNextQuestionVMPresenter();

export const useCasesContextValue = {
  fetchNextQuestion: new FetchNextQuestion(
    questionGateway,
    fetchedNextQuestionVMPresenter
  ),
  validCurrentAnswer: new ValidCurrentAnswer(questionGateway),
};

questionGateway.setNextQuestion({
  id: "123abc",
  label: "Que signifie l'acronyme TDD ?",
  answers: {
    A: "Third-Driven Development",
    B: "Test-Driven Development",
    C: "Test-Deep Development",
    D: "Test-Driven Design",
  },
});
questionGateway.setCurrentAnswerValidation("B");
