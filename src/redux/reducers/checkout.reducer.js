import { checkoutConstants } from "../constants";

const initialState = {
  checkout: []
};

export function checkout(state = initialState, action) {
  switch (action.type) {
    case checkoutConstants.CHECKOUT:
      if (state.rental) {
        return state.checkout.push(action.details);
      } else {
        return state;
      }
    case checkoutConstants.GET_ALL_CHECKOUT:
      return { ...state, checkout: { ...state.checkout, ...action.allCheckout } };
    default:
      return state;
  }
}
