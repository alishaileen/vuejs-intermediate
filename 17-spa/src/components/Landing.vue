<template>
  <main>
    <app-bagian-pengguna
      @keluar="ketikaTombolResetDiKlik"
    />
  </main>
</template>

<script>

import AppBagianPengguna from './bagian/AppBagianPengguna'

export default {
  name: "Landing",
  components: {
    AppBagianPengguna,
  },
  data() {
    return {
      dataKode: {
        inputKode: null,
        bahasaPemrogramanTerpilih: null,
        namaBerkas: null,
        highlight: null,
        twoslashTerpilih: null, 
      }
    }
  },
  methods: {
    ketikaTombolResetDiKlik() {
      this.dataKode = {
        inputKode: null,
        bahasaPemrogramanTerpilih: 'typescript',
        namaBerkas: null,
        highlight: null,
        twoslashTerpilih: null,
      }
    },
  }
}
</script>