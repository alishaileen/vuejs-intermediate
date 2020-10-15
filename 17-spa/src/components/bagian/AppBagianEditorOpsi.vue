<!-- @format -->

<template>
  <section class="editor-opsi">
    <div class="columns">
      <div class="column">
        <app-formulir-input
          :value="namaBerkas"
          nama="nama-berkas"
          label="Nama Berkas"
          icon="label"
          @input="$emit('update:namaBerkas', $event)"
        />
      </div>
      <div class="column">
        <app-formulir-input
          :value="highlight"
          nama="highlight"
          label="Baris Highlight"
          icon="marker"
          @input="$emit('update:highlight', $event)"
        />
      </div>
      <div class="column">
        <app-formulir-pilihan
          :value="bahasaPemrogramanTerpilih"
          nama="bahasa-pemrograman"
          label="Bahasa Pemrograman"
          :daftar-pilihan="daftarBahasaPemrograman"
          placeholder="Pilih bahasa"
          icon="web"
          @input="$emit('update:bahasaPemrogramanTerpilih', $event)"
        />
      </div>
      <div class="column">
        <app-formulir-pilihan
          v-show="
            bahasaPemrogramanTerpilih === 'typescript' ||
              bahasaPemrogramanTerpilih === 'json'
          "
          :value="twoslashTerpilih"
          nama="twoslash"
          label="Pilih Twoslash"
          placeholder="Pilih twoslash"
          :daftar-pilihan="daftarTwoslash"
          @input="$emit('update:twoslashTerpilih', $event)"
        />
      </div>
      <div class="column">
        <div class="opsi-aksi-editor flex">
          <AppTombolEditor
            warna="is-danger"
            icon="reload"
            @klik="$emit('reset')"
          />
          <AppTombolEditor
            v-show="$store.state.pengguna.idPengguna"
            warna="is-success"
            icon="content-save-outline"
            @klik="ketikaTombolSimpanDiKlik"
          />
          <AppTombolEditor
            v-show="hasilHighlight && hasilHighlight.length > 0"
            warna="is-info"
            icon="download-circle-outline"
            @klik="ketikaTombolUnduhDiKlik"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { stringifyUrl } from "query-string";
import cleanDeep from "clean-deep";

import { validator, dapatkanOpsi, unduhKode } from "../../utils";
import { URL_API, OPSI_STRINGIFY } from "../../constants";

import AppFormulirInput from "../AppKomponen/AppFormulirInput";
import AppFormulirPilihan from "../AppKomponen/AppFormulirPilihan";
import AppTombolEditor from "../AppKomponen/AppTombolEditor";

export default {
  components: {
    AppFormulirInput,
    AppFormulirPilihan,
    AppTombolEditor,
  },
  props: {
    inputKode: {
      required: true,
      validator,
    },
    bahasaPemrogramanTerpilih: {
      required: true,
      validator,
    },
    twoslashTerpilih: {
      required: true,
      validator,
    },
    namaBerkas: {
      required: true,
      validator,
    },
    highlight: {
      required: true,
      validator,
    },
    hasilHighlight: {
      required: true,
      validator,
    },
  },
  data() {
    return {
      daftarBahasaPemrograman: [],
      daftarTwoslash: ["twoslash", "tsconfig"],
    };
  },
  created() {
    this.dapatkanDaftarBahasaPemrograman();
  },
  methods: {
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
          dataNotifikasiGalat,
        );
        console.log(error);
      }
    },
    async ketikaTombolUnduhDiKlik() {
      try {
        this.$store.dispatch("proses/tampilkanProses", null);
        const objekUrl = {
          url: URL_API,
          query: {
            lang: this.bahasaPemrogramanTerpilih,
            fileName: this.namaBerkas,
            highlight: this.highlight,
            twoslash: this.twoslashTerpilih,
            download: 1,
          },
        };
        const url = stringifyUrl(objekUrl, OPSI_STRINGIFY);
        await unduhKode(url, {
          code: this.inputKode,
        });
      } catch (error) {
        const dataNotifikasiGalat = {
          apakahTampil: true,
          pesan: error.message || "Gagal mengunduh",
          warnaPesan: "is-danger",
        };
        this.$store.dispatch(
          "notifikasi/tampilkanNotifikasi",
          dataNotifikasiGalat,
        );
        console.log(error);
      } finally {
        this.$store.dispatch("proses/hilangkanProses", null);
      }
    },
    async ketikaTombolSimpanDiKlik() {
      try {
        const konten = cleanDeep({
          kode: this.inputKode,
          bahasaPemrograman: this.bahasaPemrogramanTerpilih,
          highlight: this.highlight,
          namaBerkas: this.namaBerkas,
          twoslash: this.twoslashTerpilih,
        });
        await this.$store.dispatch("kode/simpanKode", {
          idPengguna: this.$store.state.pengguna.idPengguna,
          konten: konten,
        });
        await this.$emit("tersimpan");
      } catch (error) {
        const dataNotifikasiGalat = {
          apakahTampil: true,
          pesan: error.message || "Gagal menyimpan",
          warnaPesan: "is-danger",
        };
        this.$store.dispatch(
          "notifikasi/tampilkanNotifikasi",
          dataNotifikasiGalat,
        );
        console.log(error);
      }
    },
  },
};
</script>
