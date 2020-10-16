<!-- @format -->

<template>
  <b-button
    :disabled="nonaktif"
    class="margin-right"
    outlined
    :type="warna"
    :icon-right="icon"
    @click="ketikaTombolDiKlik"
  />
</template>

<script>
export default {
  name: "AppTombolEditor",
  props: {
    nonaktif: {
      type: Boolean,
      default: false,
    },
    warna: {
      type: String,
      default: "is-dark",
    },
    icon: {
      type: String,
    },
  },
  methods: {
    ketikaTombolDiKlik(event) {
      this.$emit("klik", event);
    },
  },
};
</script>
