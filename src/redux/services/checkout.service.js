import { alertActions } from "../actions";
import { userActions } from "../actions";

export const checkoutService = {
  checkout
};

function checkout(details, dispatch) {
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (currentUser) {
    const userId = currentUser.id;
    let objIndex = users.findIndex(obj => obj.id === userId);
    if (users[objIndex].checkout && users[objIndex].checkout.length > 0) {
      users[objIndex].checkout.push(details);
      users[objIndex].rental = [];
      users[objIndex].catering = [];
      users[objIndex].hall = [];
      dispatch(alertActions.success("Checkout Successed"));
      dispatch(userActions.getAll());
    } else {
      users[objIndex].checkout = [];
      users[objIndex].checkout.push(details);
      users[objIndex].rental = [];
      users[objIndex].catering = [];
      users[objIndex].hall = [];
      dispatch(alertActions.success("Checkout Successed"));
      dispatch(userActions.getAll());
    }

    // Update Users
    localStorage.setItem("users", JSON.stringify(users));
  }
}
