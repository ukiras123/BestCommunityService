import { volunteerConstants } from "../constants";

const initialState = { info: {}, interest: {}, survey: {} };
export function volunteer(state = initialState, action) {
  switch (action.type) {
    case volunteerConstants.ADD_VOLUNTEER:
      return { ...state, ...action.details };
    case volunteerConstants.EMAIL_SEND:
      return initialState;
    default:
      return state;
  }
}
