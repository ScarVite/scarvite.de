<template>
  <div>
    <div v-if="loaded">
      Email Verification Sucessfull
      <nuxt-link to="/login">You can Login here </nuxt-link>
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
  data() {
    return {
      loaded: false,
    };
  },
  created() {
    if (process.client) {
      this.$axios
        .get(
          `https://api.scarvite.de/site/forgot-password/${this.$route.params.token}`
        )
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
    }
  },
};
</script>

<style>
</style>