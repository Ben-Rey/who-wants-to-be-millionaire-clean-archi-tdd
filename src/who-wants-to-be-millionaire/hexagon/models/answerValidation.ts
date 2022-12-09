export interface AnswerValidation {
  givenAnswer: string;
  rightAnswer: string;
  status: "WRONG" | "RIGHT";
}
