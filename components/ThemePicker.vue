<template>
  <div>
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
      colors: [{name: "Light", color: "light"},{ name: "Dark", color: "dark"},{ name: "Sepia", color: "sepia"}],
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

.color-wrapper {
  
}

.color {
  float: right;
  transition: all .3s ease;
  height: 30vw;
  padding: 1vw;
  /*margin: auto;*/
  overflow: hidden;
  right: 0;
  cursor: pointer;
  color: white;
}
</style>