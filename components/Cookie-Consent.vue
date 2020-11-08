<template>
  <div v-if="display" class="cookie-consent">
    <div>We are Using Cookies to Make Your Experience Better</div>
    <button class="consent-button" @click="consent()">Consent</button>
  </div>
</template>

<script>
export default {
  name: "CookieConsent",
  components: {},
  data() {
    return {
      display: false,
    };
  },
  methods: {
    consent() {
      //this.$cookies.set('cookie-consent', 1);
      if (process.client) {
        localStorage.setItem("cookie-consent", true);
      }
      this.display = false;
    },
  },
  created() {
    if (process.client) {
      if (localStorage.getItem("cookie-consent") == undefined) {
        this.display = true;
      }
    }
  },
};
</script>

<style>
.cookie-consent {
  position: fixed;
  z-index: 99999;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 12px 24px;
  color: white;
  box-sizing: border-box;
  width: 100vw;
  background-color: grey;
}

.consent-button {
  border: unset;
  border-radius: 3px;
  background-color: darkgrey;
  color: black;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}
</style>
