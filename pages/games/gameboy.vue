<template>
  <div>
    <div v-if="loaded">
      <canvas id="gameBoyImage" ref="gameBoyImage"></canvas>
    </div>
    <div v-else class="loading-wrapper">
      <loader class="ring" />
    </div>
  </div>
</template>

<script>
import socket from "socket.io-client";
import loader from "~/components/loader.vue";

export default {
  components: {
    loader,
  },
  data() {
    return {
      loaded: false,
      websocket: null,
      GBCanvas: null,
      session_id: null,
      last_screen: null
    };
  },
  computed: {},
  methods: {
    initWSConnection() {
      this.session_id =
        Math.random().toString(36).substr(3) +
        Math.random().toString(36).substr(3);
      this.websocket = socket("https://api.scarvite.de", { transports: ['websocket', 'polling', 'flashsocket'] });
      this.websocket.emit("init");
      this.websocket.once("ready", (response) => {
        if (response.success) {
          this.loaded = true;
        } else {
          this.$nuxt.error({
            statusCode: 412,
            message: "Something went wrong while creating your Session",
          });
        }
      });
      this.websocket.on("image", (screen) => {
        if(this.last_screen){
          for (let index = 0; index < screen.length; index++) {
            const lastpixel = this.last_screen[index]
            const current = screen[index]

            if(current == -1) screen[index] = lastpixel
          }
        }

        this.last_screen = screen;

        var ctx = this.$refs.gameBoyImage.getContext("2d");
        var data = ctx.createImageData(160, 144);
        data.data.set(screen);
        ctx.putImageData(data, 0, 0);
        (50, 100, 110, 44)
      });
    },
  },
  mounted() {
    if (process.client) {
      this.initWSConnection();
    }
  },
  created() {},
  head() {},
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
</style>