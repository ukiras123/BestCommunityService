export function isAuthorized() {
  // return authorization header with jwt token
  if (localStorage.getItem("user")) {
    return true;
  }
  return false;
}
