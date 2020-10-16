<template>
  <section>
    <div class="opsi-halaman flex flex-align-center margin-bottom">
      <app-tombol
        nama="sebelumnya"
        label="Sebelumnya"
        :nonaktif="halaman === 1"
        @klik="ketikaTombolSebelumnyaDiKlik"
      />
      <app-tombol
        nama="selanjutnya"
        label="Selanjutnya"
        class="margin-left"
        @klik="ketikaTombolSelanjutnyaDiKlik"
      />
    </div>
    <div class="daftar-kode flex">
      <app-kode
        v-for="itemKode in $store.state.kode.daftarKode"
        :key="itemKode.id"
        :id-kode="itemKode.id"
        :kode="itemKode.code"
        :bahasa-pemrograman="itemKode.lang"
        :apakah-highlight-menyala="apakahHighlightMenyala"
        @terhapus="dapatkanDaftarKode"
      />
    </div>
  </section>
</template>

<script>
import AppKode from "../AppKomponen/AppKode";
import AppTombol from "../AppKomponen/AppTombol";

export default {
  components: {
    AppKode,
    AppTombol,
  },
  props: {
    apakahHighlightMenyala: {
      type: Number,
      default: 1,
      required: true,
    },
    dapatkanDaftarKode: {
      type: Function,
      default() {
        return () => {};
      },
      required: true,
    },
    halaman: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  methods: {
    ketikaTombolSebelumnyaDiKlik() {
      if (this.halaman - 1 < 1) {
        return;
      }
      this.$emit("update:halaman", this.halaman - 1);
    },
    ketikaTombolSelanjutnyaDiKlik() {
      this.$emit("update:halaman", this.halaman + 1);
    },
  },
};
</script>
