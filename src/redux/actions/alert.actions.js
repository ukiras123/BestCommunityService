import { alertConstants } from "../constants";

export const alertActions = {
  success,
  error,
  clear
};

function success(message, id ) {
  return { type: alertConstants.SUCCESS, message, id };
}

function error(message, id ) {
  return { type: alertConstants.ERROR, message, id };
}

function clear() {
  return { type: alertConstants.CLEAR };
}
