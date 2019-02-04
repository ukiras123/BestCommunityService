import {
  cateringConstants
} from "../constants";

const initialState = {
  catering: [] 
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
    case cateringConstants.CATERING_ADD:
      return state.catering.push(action.details);
    case cateringConstants.CATERING_REMOVE:
      return state.catering.filter(cater => cater.id !== action.id);
    case cateringConstants.CATERING_GETALL_SUCCESS:
      return {...state, catering : {...state.catering, ...action.allCaterings}};
    default:
      return state;
  }
}