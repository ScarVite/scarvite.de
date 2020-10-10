<template>
    <div class="wrapper">
        <div
        class="project"
        v-for="(project, i) of projects"
        :key="i"
      >
      <nuxt-link :to="`/projects/${project.ID}`">{{ project.name }}</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
  components: {
    
  },
  data() {
    return {
      projects: [],
    };
  },
  computed: {

  },
  methods: {

  },
  created() {
    this.$axios
      .$get(`https://api.scarvite.de/site/projects`)
      .then((projects) => {
        this.projects = projects;
        this.fetchCount++;
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