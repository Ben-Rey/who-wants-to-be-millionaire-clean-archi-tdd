import { QuestionGateway } from "../../../hexagon/gateways/questionGateway";
import { Question } from "../../../hexagon/models/question";
import axios from "axios";

/*export class HTTPQuestionGateway implements QuestionGateway {
  async nextQuestion(): Promise<Question> {
    return this._nextQuestion!;
  }

  async validCurrentAnswer(givenAnswer: string): Promise<{
    givenAnswer: string;
    rightAnswer: string;
  }> {
    return axios.get('/questions/:id/validate').then(data => ({
      givenAnswer: data.actualAnswer,
      rightAnswer: data.expectedAnswer
    }));
  }
}*/
