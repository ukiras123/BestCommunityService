import { cateringConstants } from "../constants";

const initialState = {
  catering: []
};

export function bookCatering(state = initialState, action) {
  switch (action.type) {
    case cateringConstants.CATERING_ADD:
      if (state.catering) {
        return state.catering.push(action.details);
      } else {
        return state;
      }
    case cateringConstants.CATERING_REMOVE:
      if (state.catering && state.catering.length > 0) {
        return state.catering.filter(cater => cater.id !== action.id);
      } else {
        return state;
      }
    case cateringConstants.CATERING_GETALL_SUCCESS:
      return {
        ...state,
        catering: { ...state.catering, ...action.allCaterings }
      };
    default:
      return state;
  }
}
