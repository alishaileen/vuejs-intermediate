<!-- @format -->

<template>
  <section class="pengguna">
    <div class="columns">
      <div class="column">
        <h1 class="title is-3">Login</h1>
        <app-formulir-input
          v-model="namaPenggunaMasuk"
          nama="masuk"
          label="Nama Pengguna"
          class="margin-bottom"
        >
          <template #aksi="">
            <app-tombol
              nama="masuk"
              label="Masuk"
              @klik="ketikaTombolMasukDiKlik"
            />
          </template>
        </app-formulir-input>
      </div>
      <div class="column">
        <h1 class="title is-3">Daftar</h1>
        <app-formulir-input
          v-model="namaPenggunaDaftar"
          nama="daftar"
          label="Nama Pengguna"
          class="margin-bottom"
        >
          <template #aksi="">
            <app-tombol
              nama="daftar"
              label="Daftar"
              @klik="ketikaTombolDaftarDiKlik"
            />
          </template>
        </app-formulir-input>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      namaPenggunaMasuk: "jefrydco",
      namaPenggunaDaftar: null,
    };
  },
  methods: {
    ketikaTombolMasukDiKlik() {
      this.$store.dispatch("pengguna/masuk", {
        namaPengguna: this.namaPenggunaMasuk,
      });
      this.$emit("update:tutupModal", false);
    },
    ketikaTombolDaftarDiKlik() {
      this.$store.dispatch("pengguna/daftar", {
        namaPengguna: this.namaPenggunaDaftar,
      });
      this.namaPenggunaDaftar = null;
    },
  },
};
</script>
