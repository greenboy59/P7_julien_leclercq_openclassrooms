import jwt_decode from 'jwt-decode';

class User {
  constructor () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  get isAuthenticated () {
    return !!this.user
  }

  get isAdmin() {
    const token = this.user.token;
    const decodedToken = jwt_decode(token);
    if (decodedToken.isAdmin) {
      return true
    } else {
      return false
    }
  }

  setUser (user) {
    this.user = user
    localStorage.setItem('user', JSON.stringify(this.user))
  }
}

const UserClass = new User()
export default UserClass