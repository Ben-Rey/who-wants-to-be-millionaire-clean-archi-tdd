import { QuestionTitle } from "./questionTitle.component";
import { PossibleAnswers } from "./possibleAnswers.component";
import { QuestionNumber } from "./questionNumber.component";
import { useContext, useEffect, useState } from "react";
import { UseCasesContext } from "../useCasesContext";
import { FetchedNextQuestionVM } from "../view-models/withHighlightedAnswerFetchedNextQuestionVMPresenter";

export const CurrentQuestion = () => {
  const { fetchNextQuestion, validCurrentAnswer } = useContext(UseCasesContext);
  const [question, setQuestion] = useState<FetchedNextQuestionVM | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      await fetchNextQuestion!.handle();
      setQuestion(fetchNextQuestion!.presenter.getFetchedQuestionVM());
    };
    fetchQuestion();
  }, [fetchNextQuestion]);

  const onAnswerSelection = (givenAnswer: string) => async () => {
    fetchNextQuestion?.presenter.handleAnswerValidation(
      await validCurrentAnswer!.handle(question!.id, givenAnswer)
    );
    setQuestion(fetchNextQuestion!.presenter.getFetchedQuestionVM());
  };

  return (
    <div>
      {question && (
        <>
          <QuestionNumber />
          <QuestionTitle title={question.label} />
          <PossibleAnswers
            questionId={question.id}
            answers={question.answers}
            handleAnswerSelection={onAnswerSelection}
          />
        </>
      )}
    </div>
  );
};
