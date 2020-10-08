<template>
  <div v-if="loaded" class="container">
    <div>
      <h1 class="title">
        Welcome to My Site
      </h1>
      <h2 class="subtitle">
        This Site is Still under Development. Check Back Later
      </h2>
      <div class="links">
      </div>
    </div>
  </div>
  <div v-else class="container">
    Loading
  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  },
  data() {
    return {
      loaded: true,
    }
  },
  computed: {
    message() {
      return this.$store.state.message;
    }
  },
  methods: {
    changeMessage(Message) {
      this.$store.commit('changeMessage', Message);
    }
  },
  created() {
    setTimeout(() => {
      this.changeMessage("Hallo 2")
    }, 10000);
  }
}
</script>

<style>
.container {
  background-color: grey;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: orange;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: white;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

