import jwt_decode from "jwt-decode";

export function checkTokenValidity(token) {
  const decodedToken = jwt_decode(token);
  return token && Date.now() <= decodedToken.exp * 1000;
}

export function isAdmin(token) {
  const decodedToken = jwt_decode(token);
  return !!decodedToken.isAdmin;
}
