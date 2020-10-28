<template>
  <div>
    <div class="reset">
      <no-ssr>
        <input type="email" required placeholder="E-Mail" v-model="email" />
      </no-ssr>
      <button class="login-button" @click="submit()">Send E-Mail</button>
    </div>
    <div v-if="message !== ''">
        {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      message: "",
    };
  },
  methods: {
    submit() {
      if (this.email == "") {
        this.message = "Please Enter an Email Adress";
      };
      if(this.email.indexOf("@") == -1){
          this.message = "Please Enter a Valid Email Adress"
      }
      this.$axios
      .post('https://api.scarvite.de/site/forgot-pw', {
          email: this.email
      })
      .then(response => {

      }).catch(error => {
          console.log(error)
      })
    },
  },
};
</script>

<style>
</style>