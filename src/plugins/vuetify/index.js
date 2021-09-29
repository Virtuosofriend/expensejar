import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import preset from "./default-preset/preset";

Vue.use(Vuetify);

export default new Vuetify({
  preset,
  icons: {
    iconfont: "fa",
  },
  theme: {
    options: {
      customProperties: true,
      variations: false, // creates all the shades
    },
  },
})
