<template>
  <div>
    <fa-icon class="button" @click="expanded = !expanded" icon="list" />
    <div v-if="expanded" class="color-wrapper">
      <div
        class="color"
        @click="changeTheme(color.color)"
        v-for="(color, i) of colors"
        :key="i"
      >
        <div :class="{ active: $colorMode.preference == color.color }">
          {{ color.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemePicker',
  components: {},
  data() {
    return {
      colors: [
        { name: "Light", color: "light" },
        { name: "Dark", color: "dark" },
        { name: "Sepia", color: "sepia" },
      ],
      expanded: false,
      expandedTest: false,
    };
  },
  methods: {
    changeTheme(theme) {
      this.$colorMode.preference = theme;
      this.$store.commit("updateTheme", theme);
    },
  },
};
</script>

<style>
.active {
  color: red;
}

.dropdown-wrapper {
  float: right;
}

.color-wrapper {
  margin-top: 50px;
  width: 10em;
  right: 0px;
  z-index: 1;
  position: absolute;
  background-color: black;
}

.button {
  float:right;
  margin: auto;
  font-size: 3vw;
  display: flex;
  align-content: right;
  cursor: pointer;
}

.color {
  padding: 0.2vw;
  border-color: grey;
  border-style: solid;
  border-width: 0.1vw;
  cursor: pointer;
  font-size: 1vw;
  display: block;
  text-align: center;
}
</style>