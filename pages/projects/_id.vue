<template >
  <div class="app">
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
    <div v-else class="loading-wrapper">
      <loader class="ring" />
    </div>
  </div>
</template>

<script>
import loader from "~/components/loader.vue";

export default {
  components: {
    loader,
  },
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  data() {
    return {
      project: {},
      fetchCount: 0,
      error: {},
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
      .get(`https://api.scarvite.de/site/project/${this.$route.params.id}`)
      .then((response) => {
        if (response.status == 204)
          return this.$nuxt.error({ statusCode: 404, message: "Project Not Found" })
        else {
          this.project = response.data;
          this.fetchCount++;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
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