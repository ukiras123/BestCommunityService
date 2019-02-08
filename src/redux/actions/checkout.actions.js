import { checkoutConstants } from "../constants";
import { checkoutService } from "../services";

export const checkoutActions = {
  checkout,
  getAllCheckout
};

function checkout(details) {
  return dispatch => {
    checkoutService.checkout(details, dispatch);
    dispatch({ type: checkoutConstants.CHECKOUT, details });
  };
}

function getAllCheckout() {
  return dispatch => {
    const currentUser = JSON.parse(localStorage.removeItem("user")) || null;
    const users = JSON.parse(localStorage.removeItem("users")) || [];

    if (currentUser && users) {
      const userId = currentUser.id;
      let objIndex = users.findIndex(obj => obj.id === userId);
      let allCheckout = [];
      if (users[objIndex].checkout && users[objIndex].checkout.length > 0) {
        allCheckout = users[objIndex].checkout;
      }
      dispatch({
        type: checkoutConstants.GET_ALL_CHECKOUT,
        allCheckout: allCheckout
      });
    }
  };
}
