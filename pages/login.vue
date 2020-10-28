<template>
  <div class="login">
    <no-ssr>
      <div class="inputs">
        <input
          type="text"
          required
          minlength="3"
          maxlength="20"
          placeholder="Username"
          v-model="username"
        />
        <input
          type="password"
          minlength="6"
          required
          placeholder="Password"
          v-model="password"
        />
      </div>
    </no-ssr>
    <button class="login-button" @click="login()">Register</button>
    <div v-if="message !== {}" :class="{ error: message.error }">
      {{ message.message }}
      <div v-if="message.error">Errorcode: {{ message.code }}</div>
    </div>
    <div class="actions">
      <nuxt-link to="/register">Need to Create an Account?</nuxt-link>
      <nuxt-link to="/forgot-password">Forgot your Password?</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      message: {},
    };
  },
  watch: {
    user() {
      if (this.$store.state.user !== null) {
        this.$router.push({
          path: "/",
        });
      }
    },
  },
  methods: {
    login() {
      if (this.user == "" || this.password == "") {
        this.message = {
          message: "Your Password/Username is Missing",
          error: true,
          code: 1,
        };
        return false;
      } else {
        this.$axios
          .post("https://api.scarvite.de/site/login", {
            username: this.username.trim(),
            password: this.password,
          })
          .then((response) => {
            if (response.data.error) {
              this.message = {
                message: response.data.error.message,
                code: response.data.error.code,
                error: true,
              };
            } else if (response.data.sucess) {
              this.$store.commit("storeUser", response.data.user);
              /*this.$router.push({
                path: "/",
              });*/
              this.message = {
                message: response.data.user,
                error: false,
              };
            }
          })
          .catch((error) => {
            this.message = {
              message: error.message,
              error: true,
            };
          });
      }
    },
  },
};
</script>

<style>
</style>