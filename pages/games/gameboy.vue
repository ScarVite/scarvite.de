<template>
  <div>
    <div v-if="loaded">
      <canvas id="gameBoyImage" ref="gameBoyImage"></canvas>
      <div class="dpad-wrapper">
        <div class="center">
          <div class="center-circle"></div>
        </div>

        <div class="up direction" @click="keyPress('UP')">
          <div class="up-triangle"></div>
        </div>

        <div class="right direction" @click="keyPress('RIGHT')">
          <div class="right-triangle"></div>
        </div>
        <div class="down direction" @click="keyPress('DOWN')">
          <div class="down-triangle"></div>
        </div>

        <div class="left direction" @click="keyPress('LEFT')">
          <div class="left-triangle"></div>
        </div>
      </div>
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
    loader
  },
  data() {
    return {
      loaded: false,
      websocket: null,
      GBCanvas: null,
      last_screen: null
    };
  },
  computed: {},
  methods: {
    initWSConnection() {
      this.websocket = socket("https://api.scarvite.de/gameboy", {
        transports: ["websocket", "polling", "flashsocket"]
      });
      this.websocket.emit("init");
      this.websocket.once("ready", response => {
        if (response.success) {
          this.loaded = true;
        } else {
          this.$nuxt.error({
            statusCode: 412,
            message: "Something went wrong while creating your Session"
          });
        }
      });
      this.websocket.on("image", screen => {
        if (this.last_screen) {
          for (let index = 0; index < screen.length; index++) {
            const lastpixel = this.last_screen[index];
            const current = screen[index];

            if (current == -1) screen[index] = lastpixel;
          }
        }

        this.last_screen = screen;

        var ctx = this.$refs.gameBoyImage.getContext("2d");
        var data = ctx.createImageData(160, 144);
        data.data.set(screen);
        ctx.putImageData(data, 0, 0);
      });
    },
    keyPress(key) {
      this.websocket.emit("keyPress", key);
    },
  },
  mounted() {
    if (process.client) {
      this.initWSConnection();
      const that = this;
      window.addEventListener("keydown", function(e) {
        switch (e.key.toString()) {
          case "ArrowUp":
            that.keyPress('UP');
            break;
          case "ArrowLeft":
            that.keyPress('LEFT');
            break;
          case "ArrowRight":
            that.keyPress('RIGHT');
            break;
          case "ArrowDown":
            that.keyPress('DOWN');
            break;
          case "a":
            that.keyPress('A');
            break;
          case "b":
            that.keyPress('B');
            break;
        }
      });
    }
  },
  created() {},
  head() {
    return {
      title: "Gameboy Emulator",
      description: "A Gameboy Emulator in the Web"
    };
  }
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
