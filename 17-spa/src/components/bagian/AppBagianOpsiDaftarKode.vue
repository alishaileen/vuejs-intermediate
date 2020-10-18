<!-- @format -->

<template>
  <div class="opsi-daftar-kode is-flex">
    <app-formulir-pilihan
      :value="urutkanBerdasarkan"
      nama="urutkan-berdasarkan"
      label="Urutkan Berdasarkan"
      class="margin-right margin-bottom"
      :daftar-pilihan="daftarUrutkanBerdasarkan"
      :daftar-pilihan-berbentuk-objek="true"
      icon="sort"
      placeholder="Pilih"
      @input="$emit('update:urutkanBerdasarkan', $event)"
    />
    <app-formulir-pilihan
      :value="urutkan"
      nama="urutkan"
      label="Urutkan"
      class="margin-right margin-bottom"
      :daftar-pilihan="daftarUrutkan"
      :daftar-pilihan-berbentuk-objek="true"
      icon="sort-clock-ascending-outline"
      placeholder="Pilih"
      @input="$emit('update:urutkan', $event)"
    />
    <b-field label="Banyak Data">
      <b-numberinput
        type="is-light"
        style="width: 150px"
        class="margin-right margin-bottom"
        @input="updateBanyakData"
        :value="banyakData"
        controls-position="compact"
        min="1"
        :max="maxData"
      ></b-numberinput>
    </b-field>
  </div>
</template>

<script>
export default {
  props: {
    maxData: {
      type: Number,
      required: true,
      default: 1
    },
    banyakData: {
      type: Number,
      required: true,
      default: 1,
    },
    urutkanBerdasarkan: {
      type: String,
      required: true,
      default: "fileName",
    },
    urutkan: {
      type: String,
      required: true,
      default: "DESC",
    },
    apakahHighlightMenyala: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  data() {
    return {
      daftarHighlightMenyala: [
        { nilai: 1, teks: "Menyala" },
        { nilai: 0, teks: "Tidak Menyala" },
      ],
      daftarUrutkanBerdasarkan: [
        { nilai: "fileName", teks: "Nama Berkas" },
        { nilai: "lang", teks: "Bahasa Pemrograman" },
        { nilai: "createdAt", teks: "Kapan Dibuat" },
      ],
    };
  },
  mounted() {
    console.log(this.maxData);
  },
  computed: {
    daftarUrutkan() {
      if (this.urutkanBerdasarkan === "createdAt") {
        return [
          { nilai: "ASC", teks: "Terlama" },
          { nilai: "DESC", teks: "Terbaru" },
        ];
      }
      return [
        { nilai: "ASC", teks: "A-Z" },
        { nilai: "DESC", teks: "Z-A" },
      ];
    },
  },
  methods: {
    updateBanyakData(event) {
      this.$emit("update:banyakData", event);
    },
  },
};
</script>
