import {
  hallConstants
} from "../constants";

const initialState = {
  hall: [] 
};
/*
id,
name,
price,
fromDate,
toDate,
totalPrice,
pic
*/
export function reserveHall(state = initialState, action) {
  switch (action.type) {
    case hallConstants.HALL_ADD:
      return state.catering.push(action.details);
    case hallConstants.HALL_REMOVE:
      return state.catering.filter(cater => cater.id !== action.id);
    case hallConstants.HALL_GETALL_SUCCESS:
      return {...state, hall : {...state.hall, ...action.allHalls}};
    default:
      return state;
  }
}