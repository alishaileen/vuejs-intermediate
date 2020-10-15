import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'

import './assets/normalize.css'
import './assets/tooltip.css'
import './assets/aplikasi.css'
import '../src/style.css'
import 'buefy/dist/buefy.css'
import './assets/highlighter.css'

import App from './App.vue'
import DataCode from './components/preset/DataCode'
import DataLsp from './components/preset/DataLsp'
import DataErr from './components/preset/DataErr'

import AppRadio from './components/AppKomponen/AppRadio'
import AppTombol from './components/AppKomponen/AppTombol'
import AppFormulirAreaTeks from './components/AppKomponen/AppFormulirAreaTeks'
import AppFormulirInput from './components/AppKomponen/AppFormulirInput'
import AppFormulirPilihan from './components/AppKomponen/AppFormulirPilihan'

import pengguna from './store/pengguna'
import kode from './store/kode'
import notifikasi from './store/notifikasi'
import proses from './store/proses'

import router from "./router";

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Buefy)
Vue.component(DataCode.name, DataCode)
Vue.component(DataLsp.name, DataLsp)
Vue.component(DataErr.name, DataErr)

Vue.component(AppRadio.name, AppRadio)
Vue.component(AppTombol.name, AppTombol)
Vue.component(AppFormulirAreaTeks.name, AppFormulirAreaTeks)
Vue.component(AppFormulirInput.name, AppFormulirInput)
Vue.component(AppFormulirPilihan.name, AppFormulirPilihan)

const store = new Vuex.Store({
  state() {
    return {}
  },
  modules: {
    pengguna,
    kode,
    notifikasi,
    proses
  }
})

new Vue({
  router,
  render: h => h(App),
  store: store
}).$mount('#app')