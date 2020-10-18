<template>
  <section class="section hero is-medium is-white editor-kode-wrapper">
    <div class="container">
      <div class="">
        <div class="editor-kode">
          <div class="is-flex">
            <div class="box">
              <app-formulir-area-teks
                :value="inputKode"
                nama="input-kode"
                label="Input Kode"
                @input="$emit('update:inputKode', $event)"
              />
            </div>
            <b-icon
              style="align-self: center"
              icon="chevron-right"
              class="is-hidden-mobile"
              type="is-dark"
              size="is-large"
            >
            </b-icon>
            <div class="box--black-bg">
              <app-kode
                :kode="hasilHighlight"
                :bahasa-pemrograman="bahasaPemrogramanTerpilih"
                class="tampilan-kode--kustom"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppKode from "../AppKomponen/AppKode";

import { validator } from "../../utils";

export default {
  components: {
    AppKode,
  },
  props: {
    inputKode: {
      default: "",
      required: true,
      validator,
    },
    hasilHighlight: {
      type: String,
      default: "",
      required: true,
    },
    bahasaPemrogramanTerpilih: {
      default: "",
      required: true,
      validator,
    },
  },
};
</script>