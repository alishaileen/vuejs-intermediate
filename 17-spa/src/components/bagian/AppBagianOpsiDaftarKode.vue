<!-- @format -->

<template>
  <section class="opsi-daftar-kode">
    <app-formulir-input
      :value="banyakData"
      nama="banyak-data"
      label="Banyak Data"
      tipe="number"
      icon="text-box-multiple-outline"
      class="margin-bottom"
      @input="updateBanyakData"
    />
    <div class="opsi-highlight-menyala margin-bottom">
      <app-radio
        :value="apakahHighlightMenyala"
        :daftar-pilihan="daftarHighlightMenyala"
        nama="highlight-menyala"
        label="Highlighter"
        @input="$emit('update:apakahHighlightMenyala', $event)"
      />
    </div>
    <app-formulir-pilihan
      :value="urutkanBerdasarkan"
      nama="urutkan-berdasarkan"
      label="Urutkan Berdasarkan"
      class="margin-bottom"
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
      class="margin-bottom"
      :daftar-pilihan="daftarUrutkan"
      :daftar-pilihan-berbentuk-objek="true"
      icon="sort-clock-ascending-outline"
      placeholder="Pilih"
      @input="$emit('update:urutkan', $event)"
    />
  </section>
</template>

<script>
export default {
  props: {
    banyakData: {
      type: Number,
      required: true,
      default: 5,
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
