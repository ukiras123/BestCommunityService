import { newsConstants } from "../constants";

const initialState = {
  allNews: []
};

export function news(state = initialState, action) {
  switch (action.type) {
    case newsConstants.GET_NEWS:
      return { allNews: action.news };
    default:
      return state;
  }
}
