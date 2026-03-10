export const auth = {
  isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true'
  },

  login(username) {
    localStorage.setItem('loggedIn', 'true')
    localStorage.setItem('username', username || '')
  },

  logout() {
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('username')
  },

  getUsername() {
    return localStorage.getItem('username') || ''
  },
}
