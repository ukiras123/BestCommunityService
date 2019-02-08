import { cateringConstants } from "../constants";
import { cateringService } from "../services";

export const cateringActions = {
  addACatering,
  removeACatering,
  updateACatering,
  getAllCatering
};

function addACatering(details) {
  return dispatch => {
    cateringService.addCatering(details, dispatch);
    dispatch({ type: cateringConstants.CATERING_ADD, details });
  };
}

function removeACatering(id) {
  return dispatch => {
    cateringService.removeACatering(id, dispatch);
    dispatch({ type: cateringConstants.CATERING_REMOVE, id });
  };
}

function updateACatering(details) {
  return { type: cateringConstants.CATERING_UPDATE, details };
}

function getAllCatering() {
  return dispatch => {
    const currentUser = JSON.parse(localStorage.getItem("user")) || null;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (currentUser && users) {
      const userId = currentUser.id;
      let objIndex = users.findIndex(obj => obj.id === userId);
      let allCaterings = [];
      if (users[objIndex].catering && users[objIndex].catering !== []) {
        allCaterings = users[objIndex].catering;
      }
      dispatch({
        type: cateringConstants.RENT_GETALL_SUCCESS,
        allCaterings: allCaterings
      });
    }
  };
}
