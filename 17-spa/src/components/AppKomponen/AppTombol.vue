<!-- @format -->

<template>
  <!-- <div :class="`tombol-${nama}`">
    <button
      :disabled="nonaktif"
      @click="ketikaTombolDiKlik"
    >
      {{ label }}
    </button>
  </div> -->
  <div :class="`tombol-${nama}`">
    <b-button
      class="button"
      :type="warna"
      :disabled="nonaktif"
      @click="ketikaTombolDiKlik"
    >
      {{ label }}
    </b-button>
  </div>
</template>

<script>
export default {
  name: "AppTombol",
  props: {
    nama: {
      type: String,
      required: true,
      default: "",
    },
    label: {
      type: String,
      required: true,
      default: "",
    },
    nonaktif: {
      type: Boolean,
      default: false,
    },
    warna: {
      type: String,
      default: "is-light",
    },
  },
  methods: {
    ketikaTombolDiKlik(event) {
      this.$emit("klik", event);
    },
  },
};
</script>
