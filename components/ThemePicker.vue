<template>
  <div>
    <fa-icon class="button" @click="expanded = !expanded" icon="list" />
    <div v-if="expanded" class="color-wrapper">
      <div v-for="color of colors" :key="color">
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
      colors: [{name: "Light", color: "light"},{ name: "Dark", color: "Dark"},{ name: "Sepia", color: "sepia"}],
      expanded: false,
    };
  },
};
</script>

<style>
.button {
  font-size: 2vw;
  float: right;
  cursor: pointer;
}

.color {
  right: 0;
  cursor: pointer;
}
</style>