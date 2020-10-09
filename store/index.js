export const state = () => ({
    message: "Hallo",
    theme: 'dark',
    user: {}
  })
  
  export const mutations = {
      changeMessage(state, message) {
          state.message = message;
      }
  }