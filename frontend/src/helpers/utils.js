import UserClass from "@/classes/UserClass";
import jwt_decode from "jwt-decode";

export function checkTokenValidity() {
  const token = UserClass.user.token;
  const decodedToken = jwt_decode(token);
  return token && Date.now() <= decodedToken.exp * 1000
}