import { hallService } from "../services";
import { hallConstants } from "../constants";

export const hallActions = {
  addAHall,
  removeAHall,
  updateAHall,
  getAllHall
};

function addAHall(details) {
  return dispatch => {
    hallService.addHall(details, dispatch);
    dispatch({ type: hallConstants.HALL_ADD, details });
  };
}

function removeAHall(id) {
  return dispatch => {
    hallService.removeAHall(id, dispatch);
    dispatch({ type: hallConstants.HALL_REMOVE, id });
  };
}

function updateAHall(details) {
  return { type: hallConstants.HALL_UPDATE, details };
}

function getAllHall() {
  return dispatch => {
    const currentUser = JSON.parse(localStorage.getItem("user")) || null;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (currentUser && users) {
      const userId = currentUser.id;
      let objIndex = users.findIndex(obj => obj.id === userId);
      let allHalls = [];
      if (users[objIndex].hall && users[objIndex].hall !== []) {
        allHalls = users[objIndex].hall;
      }
      dispatch({
        type: hallConstants.HALL_GETALL_SUCCESS,
        allHalls: allHalls
      });
    }
  };
}
