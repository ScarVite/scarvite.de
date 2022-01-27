<template>
<div v-if="devMode">
  <div
    v-if="loaded"
    class="container"
    :style="{ backgroundImage: `url(${backgroundUrl})` }"
  > 
    <div>
      <h1 class="title">Welcome to My Website</h1>
      <h2 class="subtitle">
        This Site is Still undergoing Development. Check Back Later
      </h2>
      <div class="links" />
    </div>
  </div>
  <div
    v-else
    class="loading-wrapper"
  >
    <loader class="ring" />
  </div>
</div>
<div v-else>
  test
</div>
</template>

<script>
import loader from "~/components/loader.vue";
import socket from 'socket.io-client'
import backgroundUrl from "~/assets/anime_rain.gif";

export default {
  components: {
    loader,
  },
  data() {
    return {
      backgroundUrl,
      loaded: true,
      websocket: null,
    };
  },
  computed: {
    message() {
      return this.$store.state.message;
    },
    devMode() {
      return process.env.devMode;
    }
  },
  methods: {
    changeMessage(Message) {
      this.$store.commit("changeMessage", Message);
    },
  },
  mounted() {
    this.websocket = socket("https://api.scarvite.de", { transports: ['websocket', 'polling', 'flashsocket'] });
    this.websocket.on("test", (data) => {
      this.websocket.emit("received", { message: "Connected" });
    });
  },
  created() {
    setTimeout(() => {
      this.changeMessage("Hallo 2");
    }, 10000);
  },
  head() {
    return {
      title: "Startseite",
    };
  },
};
</script>

<style>
.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
}

.loading-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
}

.container {
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
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
