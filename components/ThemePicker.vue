<template>
  <div class="dropdown-wrapper">
    <fa-icon class="button" @click="expanded = !expanded" icon="list" />
    <div v-if="expanded" class="color-wrapper">
      <div v-for="(color, i) of colors" :key="i">
        <div class="color" @click="changeTheme(color.color)">
          <div :class="{active: $colorMode.preference== color.color }">
            {{ color.name }} 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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

.button {
  margin: auto;
  font-size: 3vw;
  display: flex;
  align-content: right;
  cursor: pointer;
}

.color {
  cursor: pointer;
  font-size: 1vw;
  display: block;
  text-align: center;
}
</style>