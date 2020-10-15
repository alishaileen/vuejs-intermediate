<!-- @format -->

<template>
  <div
    :class="`opsi-formulir-${nama}`"
    class="opsi-formulir flex flex-align-center"
  >
    <!-- <label :for="nama">{{ label }}:</label>

    <select :id="nama" class="margin-left" @change="ketikaNilaiBerubah">
      <option value="">Pilih</option>
      <option
        v-for="(pilihan, i) in daftarPilihan"
        :key="i"
        :value="nilaiPilihan(pilihan)"
        :selected="apakahTerpilih(pilihan)"
      >
        {{ tampilanPilihan(pilihan) }}
      </option>
    </select> -->

    <b-field label-for="nama" :label="label">
      <b-select
        :id="nama"
        :icon="icon"
        :placeholder="placeholder"
        @input="ketikaNilaiBerubah"
        :disabled="nonaktif"
      >
        <option
          v-for="(pilihan, i) in daftarPilihan"
          :value="nilaiPilihan(pilihan)"
          :key="i"
          :selected="apakahTerpilih(pilihan)"
        >
          {{ tampilanPilihan(pilihan) }}
        </option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
import { formulir } from "../../mixins";

export default {
  name: "AppFormulirPilihan",
  mixins: [formulir],
  props: {
    daftarPilihan: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    daftarPilihanBerbentukObjek: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    nonaktif: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    apakahTerpilih() {
      return (pilihan) => {
        if (this.daftarPilihanBerbentukObjek) {
          return this.value === pilihan.nilai;
        }
        return this.value === pilihan;
      };
    },
    tampilanPilihan() {
      return (pilihan) => {
        if (this.daftarPilihanBerbentukObjek) {
          return pilihan.teks;
        }
        return pilihan;
      };
    },
    nilaiPilihan() {
      return (pilihan) => {
        if (this.daftarPilihanBerbentukObjek) {
          return pilihan.nilai;
        }
        return pilihan;
      };
    },
  },
  methods: {
    ketikaNilaiBerubah(event) {
      if (event && event.length > 0) {
        this.$emit("input", event);
      } else {
        this.$emit("input", null);
      }
    },
  },
};
</script>
