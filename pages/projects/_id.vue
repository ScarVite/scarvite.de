<template >
  <div v-if="fetched" class="wrapper">
    <div class="project">
      <div class="name">
        {{ project.name }}
      </div>
      <div class="Github">
        Find This on <a :href="project.ghLink" target="_blank">Github</a>
      </div>
      <div class="image">
        <img :src="project.image" />
      </div>
    </div>
  </div>
  <div v-else>test2</div>
</template>

<script>
export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  data() {
    return {
      project: {},
      fetchCount: 0,
    };
  },
  computed: {
    fetched() {
      return this.fetchCount == 1;
    },
  },
  methods: {},
  created() {
    this.$axios
      .$get(`https://api.scarvite.de/site/project/${this.$route.params.id}`)
      .then((project) => {
        this.project = project;
        this.fetchCount++;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
.wrapper {
  display: none;
}
</style>