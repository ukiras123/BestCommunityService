import {
  hallConstants
} from "../constants";

const initialState = {
  hall: []
};

export function reserveHall(state = initialState, action) {
  switch (action.type) {
    case hallConstants.HALL_ADD:
      if (state.hall) {
        return state.hall.push(action.details);
      } else {
        return state;
      }
    case hallConstants.HALL_REMOVE:
      if (state.hall && state.hall.length > 0) {
        return state.hall.filter(cater => cater.id !== action.id);
      } else {
        return state;
      }
    case hallConstants.HALL_GETALL_SUCCESS:
      return {
        ...state,
        hall: {
          ...state.hall,
          ...action.allHalls
        }
      };
    default:
      return state;
  }
}