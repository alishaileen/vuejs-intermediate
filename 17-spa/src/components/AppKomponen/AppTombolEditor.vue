<!-- @format -->

<template>
  <b-tooltip
    :label="labelTooltip"
    :type="typeTooltip"
    position="is-bottom"
    :active="nonaktif"
  >
    <b-button
      :disabled="nonaktif"
      class="margin-right"
      inverted
      :type="warna"
      :icon-right="icon"
      @click="ketikaTombolDiKlik"
    />
  </b-tooltip>
</template>

<script>
export default {
  name: "AppTombolEditor",
  props: {
    labelTooltip: {
      type: String,
      default: "",
    },
    typeTooltip: {
      type: String,
      default: "is-dark",
    },
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
