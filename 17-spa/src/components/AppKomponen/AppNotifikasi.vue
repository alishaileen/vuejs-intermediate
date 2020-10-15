<!-- @format -->

<template>
  <b-notification
    auto-close
    v-model="$store.state.notifikasi.apakahTampil"
    has-icon
    :type="$store.state.notifikasi.warnaPesan"
    class="notifikasi"
    aria-close-label="Close notification"
  >
    {{ $store.state.notifikasi.pesan }}
  </b-notification>
</template>

<script>
export default {
  name: "AppNotifikasi",
};
</script>

<style>
.notifikasi {
  z-index: 1000;
  position: fixed;
  right: 50px;
  top: 50px;
  /* width: 300px;
  height: auto;
  padding: 10px;
  border-radius: 5px; */
}
</style>
