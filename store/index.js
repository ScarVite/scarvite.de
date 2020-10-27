export const state = () => ({
    message: "Hallo",
    user: null
  })
  
  export const mutations = {
      changeMessage(state, message) {
          state.message = message;
      },
  }