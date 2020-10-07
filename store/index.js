export const state = () => ({
    message: "Hallo",
    //user: {}
  })
  
  export const mutations = {
      changeMessage(state, message) {
          state.message = message;
      }
  }