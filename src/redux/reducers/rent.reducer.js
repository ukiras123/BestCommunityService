import { rentConstants } from "../constants";

const initialState = {
  rental: []
};

export function rentEquipment(state = initialState, action) {
  switch (action.type) {
    case rentConstants.RENT_ADD:
      if (state.rental) {
        return state.rental.push(action.details);
      } else {
        return state;
      }
    case rentConstants.RENT_REMOVE:
      if (state.rental && state.rental.length > 0) {
        return state.rental.filter(rent => rent.id !== action.id);
      } else {
        return state;
      }
    case rentConstants.RENT_GETALL_SUCCESS:
      return { ...state, rental: { ...state.rental, ...action.allRentals } };
    default:
      return state;
  }
}
