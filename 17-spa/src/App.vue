<template>
  <main>
    <router-view></router-view>
    <app-notifikasi />
    <app-proses />
  </main>
</template>

<script>
import AppNotifikasi from './components/AppKomponen/AppNotifikasi'
import AppProses from './components/AppKomponen/AppProses'

export default {
  name: "App",
  components: {
    AppNotifikasi,
    AppProses
  }
};
</script>
