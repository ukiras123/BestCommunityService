import { quizConstants } from "../constants";

const initialState = {
  questions: {}
};

export function quiz(state = initialState, action) {
  switch (action.type) {
    case quizConstants.GET_QUIZ_QUESTIONS:
      return { questions: action.details };
    default:
      return state;
  }
}
