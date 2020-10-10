<template>
    <div class="wrapper">
        <ThemePicker ref="themepicker"/>
    </div>
</template>

<script>
import ThemePicker from "~/components/ThemePicker.vue";

export default {
    name: 'navigation',
    components: {
    ThemePicker,
  },
}
</script>

<style>

</style>