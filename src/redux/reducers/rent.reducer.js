import {
  rentConstants
} from "../constants";

const initialState = {
  rental: [] 
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
export function rentEquipment(state = initialState, action) {
  switch (action.type) {
    case rentConstants.RENT_ADD:
      return state.rental.push(action.details);
    case rentConstants.RENT_REMOVE:
      return state.rental.filter(rent => rent.id !== action.id);
    case rentConstants.RENT_GETALL_SUCCESS:
      return {...state, rental : {...state.rental, ...action.allRentals}};
    default:
      return state;
  }
}