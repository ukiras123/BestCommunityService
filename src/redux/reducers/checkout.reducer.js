import { checkoutConstants } from "../constants";

const initialState = {
  checkoutItems: []
};

export function checkout(state = initialState, action) {
  switch (action.type) {
    case checkoutConstants.CHECKOUT:
      if (state.rental) {
        return state.checkoutItems.push(action.details);
      } else {
        return state;
      }
    case checkoutConstants.GET_ALL_CHECKOUT:
      return { checkoutItems: action.allCheckout };
    default:
      return state;
  }
}
