import { quizConstants } from "../constants";
import { quizService } from "../services";

export const quizActions = {
  getQuizQuestions
};

function getQuizQuestions(category, number = 10) {
  return dispatch => {
    quizService
      .getQuizQuestions(category, number, dispatch)
      .then(details =>
        dispatch({ type: quizConstants.GET_QUIZ_QUESTIONS, details })
      );
  };
}
