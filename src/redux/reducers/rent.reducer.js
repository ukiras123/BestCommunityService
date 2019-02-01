import {
  rentConstants
} from "../constants";

const initialState = {
  items: []
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
export function rentEquipment(state = {}, action) {
  switch (action.type) {
    case rentConstants.RENT_ADD:
      return { ...state,
        ...action.rentDetail
      };
    case rentConstants.RENT_REMOVE:
      return state.filter(item => item.id !== action.id)
    case rentConstants.RENT_GET:
      return state;
    default:
      return state;
  }
}