import { alertActions } from "../actions";
const _ = require("lodash");

export const rentService = {
  addRental,
  removeARental
};

function addRental(details, dispatch) {
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (currentUser) {
    const userId = currentUser.id;
    let objIndex = users.findIndex(obj => obj.id === userId);
    if (users[objIndex].rental && users[objIndex].rental !== []) {
      if (
        _.isEmpty(users[objIndex].rental.filter(prod => prod.id === details.id))
      ) {
        users[objIndex].rental.push(details);
        dispatch(alertActions.success("Added to your cart", details.id));
      } else {
        dispatch(alertActions.error("It is already in your cart", details.id));
      }
    } else {
      users[objIndex].rental = [];
      users[objIndex].rental.push(details);
      dispatch(alertActions.success("Added to your cart", details.id));
    }
    // Update Users
    localStorage.setItem("users", JSON.stringify(users));
  }
}

function removeARental(rentalId) {
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (currentUser) {
    const userId = currentUser.id;
    let objIndex = users.findIndex(obj => obj.id === userId);
    if (users[objIndex].rental && users[objIndex].rental !== []) {
      let updatedRental = users[objIndex].rental.filter(
        rent => rent.id !== rentalId
      );
      users[objIndex].rental = updatedRental;
    }
    // Update Users
    localStorage.setItem("users", JSON.stringify(users));
  }
}
