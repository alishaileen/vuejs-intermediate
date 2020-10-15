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
    <b-button :type="btnType" :disabled="nonaktif" @click="ketikaTombolDiKlik">
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

    btnType: {
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
