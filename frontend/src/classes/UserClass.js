class User {
  constructor () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  get isAuthenticated () {
    return !!this.user
  }

  setUser (user) {
    this.user = user
    localStorage.setItem('user', JSON.stringify(this.user))
  }
}

const UserClass = new User()
export default UserClass