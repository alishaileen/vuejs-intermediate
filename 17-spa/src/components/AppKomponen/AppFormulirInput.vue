<template>
  <div>
    <!-- <label :for="nama">{{ label }}:</label>
    <input
      :value="value"
      :type="tipe"
      :id="nama"
      class="margin-left"
      @input="ketikaNilaiBerubah"
    /> -->
    <b-field label-for="nama" :label="label">
      <b-input
        :icon="icon"
        :value="value"
        :type="tipe"
        :id="nama"
        @input="ketikaNilaiBerubah"
      ></b-input>
    </b-field>
    <slot name="aksi" />
  </div>
</template>

<script>
import { formulir } from "../../mixins";

export default {
  name: "AppFormulirInput",
  mixins: [formulir],
  props: {
    tipe: {
      type: String,
      default: "text",
    },
    icon: {
      type: String,
      default: "",
    },
  },
  methods: {
    ketikaNilaiBerubah(event) {
      if (this.tipe === "number") {
        this.$emit("input", parseInt(event));
      } else {
        this.$emit("input", event);
      }
    },
  },
};
</script>
