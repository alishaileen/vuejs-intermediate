/** @format */

function state() {
  return {
    apakahTampil: false,
    pesan: null,
    warnaPesan: "",
  };
}

const mutations = {
  aturNotifikasi(state, { apakahTampil, pesan, warnaPesan }) {
    state.apakahTampil = apakahTampil;
    state.pesan = pesan;
    state.warnaPesan = warnaPesan;
  },
  hapusNotifikasi(state) {
    state.apakahTampil = false;
    state.pesan = null;
    state.warnaPesan = "";
  },
};

const actions = {
  tampilkanNotifikasi({ commit }, { apakahTampil, pesan, warnaPesan }) {
    commit("aturNotifikasi", {
      apakahTampil,
      pesan,
      warnaPesan,
    });
    setTimeout(() => {
      commit("hapusNotifikasi");
    }, 5000);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
