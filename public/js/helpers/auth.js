/* Authentication Helper, from React.js documentation */
/* Beginning of function exports */
module.exports = {
  // Initiates login and reads from localStorage token
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    // Sets token
    loginRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },
  // Initiates signup and calls helper method below 'signupRequest'
  signup(email, pass, cb){
    cb = arguments(arguments.length - 1)
    signupRequest(email, pass, (res)=>{
      cb()
    })
  },
  // Obtains token from localStorage
  getToken() {
    console.log('auth.js:29: ' + localStorage.token);
    return localStorage.token
  },
  // Logs out the user by deleting localStorage
  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },
  // Returns boolean value of whether or not a token currently exists
  loggedIn() {
    return !!localStorage.token
  },
  // Needed to allow onChange built-in method to function
  onChange() {}
}
/* End of function exports */

// Takes the login request and tests credentials with stored info in back-end
function loginRequest(email, pass, cb) {
  $.post('users/login', {email: email, password: pass})
    .done((data)=>{
      cb({
        authenticated: true,
        token: data.token
      })
    })
    .fail((data)=>{
      cb({
        status: 202,
        data: data
      })
    })
}

// Takes signup request and adds new information to back-end database 
function signupRequest(email, pass, cb) {
  $.post('/users/signup', {email: email, password: pass})
    .done((data)=>{
      cb({
        status: 201,
        success: true
      })
    })
    .fail((data)=>{
      cb({
        status: 202,
        data: data
      })
    })
}

// NEEDS TO BE UPDATED TO A REAL BACKEND REQUEST
// NEEDS TO BE UPDATED TO A REAL BACKEND REQUEST
// NEEDS TO BE UPDATED TO A REAL BACKEND REQUEST
// NEEDS TO BE UPDATED TO A REAL BACKEND REQUEST
// NEEDS TO BE UPDATED TO A REAL BACKEND REQUEST
// NEEDS TO BE UPDATED TO A REAL BACKEND REQUEST
function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}
