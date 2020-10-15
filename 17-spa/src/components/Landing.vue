<!-- @format -->

<template>
  <main>
    <nav class="container">
      <b-navbar class="navbar">
        <template slot="end">
          <b-navbar-item tag="div">
            <b-button
              v-if="!$store.state.pengguna.idPengguna"
              class="button is-primary"
              @click="bukaModalLogin()"
            >
              Login
            </b-button>
            <b-button
              v-if="$store.state.pengguna.idPengguna"
              class="button is-primary margin-right"
              tag="router-link"
              to="/list-kode"
            >
              List Kode
            </b-button>
            <app-tombol
              v-if="$store.state.pengguna.idPengguna"
              class="margin-right"
              nama="keluar"
              label="Keluar"
              @klik="ketikaTombolKeluarDiKlik"
            />
          </b-navbar-item>
        </template>
      </b-navbar>
    </nav>

    <section class="editor">
      <div class="container">
        <app-bagian-editor-opsi
          :input-kode="dataKode.inputKode"
          :bahasa-pemrograman-terpilih.sync="dataKode.bahasaPemrogramanTerpilih"
          :twoslash-terpilih.sync="dataKode.twoslashTerpilih"
          :nama-berkas.sync="dataKode.namaBerkas"
          :highlight.sync="dataKode.highlight"
          :hasil-highlight="hasilHighlight"
          @tersimpan="dapatkanDaftarKode"
          @reset="ketikaTombolResetDiKlik"
        />

        <div class="box">
          <app-bagian-editor-kode
            :input-kode.sync="dataKode.inputKode"
            :hasil-highlight="hasilHighlight"
            :bahasa-pemrograman-terpilih="dataKode.bahasaPemrogramanTerpilih"
          />
        </div>
      </div>
    </section>

    <footer class="footer has-text-centered">asdf</footer>

    <b-modal
      has-modal-card
      :can-cancel="true"
      :width="640"
      v-model="isModalOpened"
    >
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Login atau Daftar</p>
          <button type="button" class="delete" @click="isModalOpened = false" />
        </header>
        <section class="modal-card-body">
          <app-bagian-pengguna :tutupModal.sync="isModalOpened" />
        </section>
      </div>
    </b-modal>
  </main>
</template>

<script>
import { stringifyUrl } from "query-string";
import debounce from "debounce-fn";
import cleanDeep from "clean-deep";

import AppBagianPengguna from "./bagian/AppBagianPengguna";
import AppBagianEditorOpsi from "./bagian/AppBagianEditorOpsi";
import AppBagianEditorKode from "./bagian/AppBagianEditorKode";

import AppTombol from "./AppKomponen/AppTombol";

import { dapatkanOpsi, kirimData, unduhKode } from "../utils";
import { URL_API, OPSI_STRINGIFY } from "../constants";

export default {
  name: "Landing",
  components: {
    AppBagianPengguna,
    AppBagianEditorOpsi,
    AppBagianEditorKode,

    AppTombol,
  },
  data() {
    return {
      dataKode: {
        inputKode: null,
        bahasaPemrogramanTerpilih: null,
        namaBerkas: null,
        highlight: null,
        twoslashTerpilih: null,
      },
      filter: {
        halaman: 1,
        banyakData: 6,
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
    dataKode: {
      handler: debounce(
        function (dataKode) {
          this.hasilHighlight = "";
          this.highlighter(dataKode.inputKode);
        },
        { wait: 500 }
      ),
      deep: true,
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
  async created() {
    await this.dapatkanDaftarBahasaPemrograman();
    await this.dapatkanDaftarKode();
  },
  methods: {
    bukaModalLogin() {
      this.isModalOpened = true;
    },

    ketikaTombolResetDiKlik() {
      this.dataKode = {
        inputKode: null,
        bahasaPemrogramanTerpilih: "typescript",
        namaBerkas: null,
        highlight: null,
        twoslashTerpilih: null,
      };
    },
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
    async ketikaTombolUnduhDiKlik() {
      try {
        this.$store.dispatch("proses/tampilkanProses", null);
        const objekUrl = {
          url: URL_API,
          query: {
            lang: this.dataKode.bahasaPemrogramanTerpilih,
            fileName: this.dataKode.namaBerkas,
            highlight: this.dataKode.highlight,
            twoslash: this.dataKode.twoslashTerpilih,
            download: 1,
          },
        };
        const url = stringifyUrl(objekUrl, OPSI_STRINGIFY);
        await unduhKode(url, {
          code: this.dataKode.inputKode,
        });
      } catch (error) {
        const dataNotifikasiGalat = {
          apakahTampil: true,
          warnaPesan: "is-danger",
          pesan: error.message || "Gagal mengunduh",
        };
        this.$store.dispatch(
          "notifikasi/tampilkanNotifikasi",
          dataNotifikasiGalat
        );
        console.log(error);
      } finally {
        this.$store.dispatch("proses/hilangkanProses", null);
      }
    },
    async ketikaTombolSimpanDiKlik() {
      try {
        const konten = cleanDeep({
          kode: this.dataKode.inputKode,
          bahasaPemrograman: this.dataKode.bahasaPemrogramanTerpilih,
          highlight: this.dataKode.highlight,
          namaBerkas: this.dataKode.namaBerkas,
          twoslash: this.dataKode.twoslashTerpilih,
        });
        await this.$store.dispatch("kode/simpanKode", {
          idPengguna: this.$store.state.pengguna.idPengguna,
          konten: konten,
        });
        await this.dapatkanDaftarKode();
      } catch (error) {
        const dataNotifikasiGalat = {
          apakahTampil: true,
          pesan: error.message || "Gagal menyimpan",
          warnaPesan: "is-danger",
        };
        this.$store.dispatch(
          "notifikasi/tampilkanNotifikasi",
          dataNotifikasiGalat
        );
        console.log(error);
      }
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
    async highlighter(inputKode, download) {
      try {
        this.$store.dispatch("proses/tampilkanProses", null);
        const objekUrl = {
          url: URL_API,
          query: {
            lang: this.dataKode.bahasaPemrogramanTerpilih,
            fileName: this.dataKode.namaBerkas,
            highlight: this.dataKode.highlight,
            twoslash: this.dataKode.twoslashTerpilih,
            download,
          },
        };
        const url = stringifyUrl(objekUrl, OPSI_STRINGIFY);

        const respon = await kirimData(url, {
          code: inputKode,
        });

        if (respon.success && !respon.error) {
          this.hasilHighlight = respon.data;
        } else {
          throw new Error(respon.message);
        }
      } catch (error) {
        const dataNotifikasiGalat = {
          apakahTampil: true,
          pesan: error.message || "Bahasa Pemrograman dan Kode wajib diisi",
          warnaPesan: "is-warning",
        };
        this.$store.dispatch(
          "notifikasi/tampilkanNotifikasi",
          dataNotifikasiGalat
        );
        console.log(error);
      } finally {
        this.$store.dispatch("proses/hilangkanProses", null);
      }
    },
    ketikaTombolKeluarDiKlik() {
      this.$store.dispatch("pengguna/keluar");
      this.$emit("keluar");
    },
  },
};
</script>
