<template>
  <div class="dropdown-wrapper">
    <fa-icon class="button" @click="expanded = !expanded" icon="list" />
    <div v-if="expanded" class="color-wrapper">
      <div v-for="(color, i) of colors" :key="i">
        <div class="color" @click="$colorMode.preference = color.color">
          {{ color.name }}
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
  methods: {},
};
</script>

<style>
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
  display: block;
  /*transition: all .3s ease;
  height: 30vw;
  padding-right: 1vw;
  padding-left: 1vw;
  margin: auto;*/
  text-align: right;
  right: 0;
  cursor: pointer;
}
</style>