<template>
  <div>
    <div v-if="loaded">Email Verification Sucessfull</div>
    <div v-else class="loading-wrapper">
      <loader class="ring" />
    </div>
  </div>
</template>

<script>
import loader from "~/components/loader.vue";

export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.token);
  },
  components: {
    loader,
  },
  data() {
    return {
      loaded: false,
    };
  },
  created() {
    this.$axios
      .get(`https://api.scarvite.de/site/register/${this.$route.params.token}`)
      .then((response) => {
        if (response.status != 200)
          return this.$nuxt.error({
            statusCode: 404,
            message: "This Token Does not Exist or Is Expired",
          });
        else {
            this.loaded = true;
        }
      })
      .catch((error) => {
        console.log(error);
        return this.$nuxt.error({
          statusCode: 404,
          message: "An Error Occured",
        });
      });
  },
};
</script>

<style>
</style>