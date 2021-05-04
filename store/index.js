export const state = () => ({
    user: JSON.parse(localStorage.getItem('user'))
})

export const mutations = {
  add(state, user) {
    state.user = user
  },
  remove() {
    state.user = null
  }
}
