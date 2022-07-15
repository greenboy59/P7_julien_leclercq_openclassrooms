import UserClass from '@/classes/UserClass';
import jwt_decode from 'jwt-decode';

function checkTokenValidity() {
  const token = UserClass.user.token;
const decodedToken = jwt_decode(token);
  if (token && Date.now() <= decodedToken.exp * 1000) {
    return true
  } else {
    return false
  }
}

export { checkTokenValidity };