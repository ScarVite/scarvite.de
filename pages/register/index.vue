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
        <input type="email" required placeholder="E-Mail" v-model="email" />
        <input
          type="password"
          minlength="6"
          required
          placeholder="Password"
          v-model="password"
        />
        <input
          type="password"
          required
          placeholder="Repeat Password"
          v-model="confirmPassword"
        />
      </div>
    </no-ssr>
    <button class="login-button" @click="register()">Register</button>
    <div v-if="message !== {}" :class="{ error: message.error }">{{ message.message }}<div v-if="message.error"> Errorcode: {{ message.code }}</div></div>
    <div class="actions">
      <nuxt-link to="/login">Already Own an Account ?</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      message: {}
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
      register() {
        if (this.password !== this.confirmPassword ) {
          this.message = {
                  message: "The Passwords don't match",
                  error: true,
                  code: 1
              }
          return false;
        }
        else if(this.password == "" || this.confirmPassword == "" || this.username == "" || this.email == "") {
            this.message = {
                  message: "Your Email/Password/Username is Missing",
                  error: true,
                  code: 1
              }
          return false;
        }
        //else if()
        else if (this.username.length < 25) {
          this.$axios
            .post("https://api.scarvite.de/site/register", {
              email: this.email,
              password: this.password,
              username: this.username.trim(),
            })
            .then((response) => {
              /*this.$router.push({
                path: "/login",
              });*/
              if(response.data.error){
                  this.message = {
                  message: response.data.error.message,
                  code: response.data.error.code,
                  error: true
              }
              }
              else if(response.data.sucess){
                  this.message = {
                  message: response.data.message,
                  error: false
              }
              }
            })
            .catch((error) => {
              this.message = {
                  message: error.message,
                  error: true
              }
            });
        } else {
          this.errorMessage =
            "Your Username is too Long, Please Make it Shorter than 25 chars.";
        }
      },
    },
};
</script>

<style>

.error {
    color: red;
}
</style>