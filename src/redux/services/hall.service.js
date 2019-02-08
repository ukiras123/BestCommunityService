import { alertActions } from "../actions";
import { userActions } from "../actions";
const _ = require("lodash");

export const hallService = {
  addHall,
  removeAHall
};

function addHall(details, dispatch) {
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (currentUser) {
    const userId = currentUser.id;
    let objIndex = users.findIndex(obj => obj.id === userId);
    if (users[objIndex].hall && users[objIndex].hall !== []) {
      if (
        _.isEmpty(users[objIndex].hall.filter(hall => hall.id === details.id))
      ) {
        users[objIndex].hall.push(details);
        dispatch(alertActions.success("Added to your cart", details.id));
        dispatch(userActions.getAll());
      } else {
        dispatch(alertActions.error("It is already in your cart", details.id));
      }
    } else {
      users[objIndex].hall = [];
      users[objIndex].hall.push(details);
      dispatch(alertActions.success("Added to your cart", details.id));
      dispatch(userActions.getAll());
    }
    // Update Users
    localStorage.setItem("users", JSON.stringify(users));
  }
}

function removeAHall(hallId, dispatch) {
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (currentUser) {
    const userId = currentUser.id;
    let objIndex = users.findIndex(obj => obj.id === userId);
    if (users[objIndex].hall && users[objIndex].hall !== []) {
      let updatedHall = users[objIndex].hall.filter(
        h => h.id !== hallId
      );
      users[objIndex].hall = updatedHall;
    }
    // Update Users
    localStorage.setItem("users", JSON.stringify(users));
    dispatch(userActions.getAll());
  }
}
