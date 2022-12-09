import React, { FC } from "react";
import { FetchedNextQuestionVM } from "../view-models/withHighlightedAnswerFetchedNextQuestionVMPresenter";

interface Props {
  questionId: string;
  answers: FetchedNextQuestionVM["answers"];
  handleAnswerSelection: (givenAnswer: string) => () => void;
}

const highlightedMap = {
  NONE: "bg-gray-900",
  RIGHT: "bg-green-600",
  WRONG: "bg-orange-500",
};

export const PossibleAnswers: FC<Props> = ({
  questionId,
  answers,
  handleAnswerSelection,
}) => {
  return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
      {Object.entries(answers).map(([letter, { label, highlighted }]) => {
        const className =
          "border-3 border-blue-300 rounded-lg px-3 py-1 " +
          highlightedMap[highlighted];
        return (
          <div
            key={questionId + letter}
            className={className}
            onClick={handleAnswerSelection(letter)}
          >
            <span className="text-orange-500">{letter}:</span> {label}
          </div>
        );
      })}
    </div>
  );
};
