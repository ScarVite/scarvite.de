<template>
  <div v-if="fetched" class="wrapper">
    <div class="project" v-for="(project, i) of projects" :key="i">
      <nuxt-link :to="`/projects/${project.ID}`">{{ project.name }}</nuxt-link>
    </div>
  </div>
  <div v-else class="loading-wrapper">
    <loader class="ring" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      projects: [],
      fetched: false,
    };
  },
  computed: {},
  methods: {},
  created() {
    this.$axios
      .$get(`https://api.scarvite.de/site/projects`)
      .then((projects) => {
        this.projects = projects;
        this.fetchCount++;
        this.fetched = true;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  head() {
    return {
      title: "ScarVite",
    };
  },
};
</script>

<style>
</style>