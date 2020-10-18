<!-- @format -->

<template>
  <main id="list-kode">
    <section class="hero section is-small is-primary">
      <div class="container">
        <b-button class="button is-link margin-bottom" icon-left="arrow-left" tag="router-link" to="/">
          Kembali
        </b-button>

        <h1 v-show="$store.state.pengguna.idPengguna" class="title is-1">
          Halo, {{ $store.state.pengguna.namaPengguna }}
        </h1>

        <app-bagian-opsi-daftar-kode
          :banyak-data.sync="filter.banyakData"
          :urutkan-berdasarkan.sync="filter.urutkanBerdasarkan"
          :urutkan.sync="filter.urutkan"
          :apakah-highlight-menyala.sync="filter.apakahHighlightMenyala"
          :maxData="maxData"
        />
      </div>
    </section>
    <section class="hero section">
      <div class="container">
        <app-bagian-daftar-kode
        :halaman.sync="filter.halaman"
        :apakah-highlight-menyala="filter.apakahHighlightMenyala"
        :dapatkan-daftar-kode="dapatkanDaftarKode"
      />
      </div>
    </section>
  </main>
</template>

<script>
// import { stringifyUrl } from "query-string";
import debounce from "debounce-fn";
// import cleanDeep from "clean-deep";

import AppBagianOpsiDaftarKode from "./bagian/AppBagianOpsiDaftarKode";
import AppBagianDaftarKode from "./bagian/AppBagianDaftarKode";

// import AppTombol from "./AppKomponen/AppTombol";

import { dapatkanOpsi } from "../utils";
// import { URL_API, OPSI_STRINGIFY } from "../constants";

export default {
  name: "ListKode",
  components: {
    AppBagianOpsiDaftarKode,
    AppBagianDaftarKode,

    // AppTombol,
  },
  data() {
    return {
      maxData: this.$store.state.kode.daftarKode.length,
      filter: {
        halaman: 1,
        banyakData: this.$store.state.kode.daftarKode.length,
        urutkanBerdasarkan: "createdAt",
        urutkan: "DESC",
        apakahHighlightMenyala: 1,
      },
      hasilHighlight: "",
      daftarBahasaPemrograman: [],

      isModalOpened: false,
    };
  },
  watch: {
    "$store.state.pengguna.idPengguna"(idPengguna) {
      if (idPengguna) {
        this.dapatkanDaftarKode();
      }
    },
    filter: {
      handler: debounce(
        function () {
          this.dapatkanDaftarKode();
        },
        { wait: 500 }
      ),
      deep: true,
    },
  },
  created() {
    if (!this.$store.state.pengguna.idPengguna) {
      this.$router.push("/");
    }
  },
  methods: {
    async dapatkanDaftarKode() {
      await this.$store.dispatch("kode/dapatkanSemuaKode", {
        idPengguna: this.$store.state.pengguna.idPengguna,
        filter: {
          halaman: this.filter.halaman,
          banyakData: this.filter.banyakData,
          urutkanBerdasarkan: this.filter.urutkanBerdasarkan,
          urutkan: this.filter.urutkan,
          apakahHighlightMenyala: this.filter.apakahHighlightMenyala,
        },
      });
    },
    async dapatkanDaftarBahasaPemrograman() {
      try {
        const respon = await dapatkanOpsi();
        if (respon.success && !respon.error) {
          this.daftarBahasaPemrograman = respon.data.languages;
        }
      } catch (error) {
        const dataNotifikasiGalat = {
          apakahTampil: true,
          pesan: error.message,
          warnaPesan: "is-danger",
        };
        this.$store.dispatch(
          "notifikasi/tampilkanNotifikasi",
          dataNotifikasiGalat
        );
        console.log(error);
      }
    },
  },
};
</script>
