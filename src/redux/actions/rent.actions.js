import { rentConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./";
import { history } from "../../_helpers";

export const rentEquipmentActions = {
  rentEquipment,
  removeRentEquipment,
  getAllRentedEquipment
};

function rentEquipment(rentDetail) {
  return dispatch => {
    dispatch(request({ rentDetail }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push("/");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: rentConstants.RENT_REQUEST, rentDetail };
  }
  function success(user) {
    return { type: rentConstants.RENT_SUCCESS, rentDetail };
  }
  function failure(error) {
    return { type: rentConstants.RENT_SUCCESS, error };
  }
}

function removeRentEquipment(id) {
  return { type: rentConstants.RENT_REMOVE, id };
}

function getAllRentedEquipment() {
  return { type: rentConstants.RENT_GET };
}
