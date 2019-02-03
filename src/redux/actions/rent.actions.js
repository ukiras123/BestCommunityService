import { rentConstants } from "../constants";
import { rentService } from "../services";

export const rentActions = {
  addARental,
  removeARental,
  updateARental,
  getAllRental
};

function addARental(details) {
  return dispatch => {
    rentService.addRental(details, dispatch);
    dispatch({ type: rentConstants.RENT_ADD, details });
  };
}

function removeARental(id) {
  rentService.removeARental(id);
  return { type: rentConstants.RENT_REMOVE, id };
}

function updateARental(details) {
  return { type: rentConstants.RENT_UPDATE, details };
}

function getAllRental() {
  return dispatch => {
    const currentUser = JSON.parse(localStorage.removeItem("user")) || null;
    const users = JSON.parse(localStorage.removeItem("users")) || [];

    if (currentUser && users) {
      const userId = currentUser.id;
      let objIndex = users.findIndex(obj => obj.id === userId);
      let allRentals = [];
      if (users[objIndex].rental && users[objIndex].rental !== []) {
        allRentals = users[objIndex].rental;
      }
      dispatch({
        type: rentConstants.RENT_GETALL_SUCCESS,
        allRentals: allRentals
      });
    }
  };
}
