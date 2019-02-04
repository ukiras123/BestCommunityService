import { alertActions } from "../actions";
import { userActions } from "../actions";
const _ = require("lodash");

export const cateringService = {
  addCatering,
  removeACatering
};

function addCatering(details, dispatch) {
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (currentUser) {
    const userId = currentUser.id;
    let objIndex = users.findIndex(obj => obj.id === userId);
    if (users[objIndex].catering && users[objIndex].catering !== []) {
      if (
        _.isEmpty(users[objIndex].catering.filter(prod => prod.id === details.id))
      ) {
        users[objIndex].catering.push(details);
        dispatch(alertActions.success("Added to your cart", details.id));
        dispatch(userActions.getAll());
      } else {
        dispatch(alertActions.error("It is already in your cart", details.id));
      }
    } else {
      users[objIndex].catering = [];
      users[objIndex].catering.push(details);
      dispatch(alertActions.success("Added to your cart", details.id));
      dispatch(userActions.getAll());
    }
    // Update Users
    localStorage.setItem("users", JSON.stringify(users));
  }
}

function removeACatering(cateringId, dispatch) {
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (currentUser) {
    const userId = currentUser.id;
    let objIndex = users.findIndex(obj => obj.id === userId);
    if (users[objIndex].catering && users[objIndex].catering !== []) {
      let updatedCatering = users[objIndex].catering.filter(
        rent => rent.id !== cateringId
      );
      users[objIndex].catering = updatedCatering;
    }
    // Update Users
    localStorage.setItem("users", JSON.stringify(users));
    dispatch(userActions.getAll());
  }
}
