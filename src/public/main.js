'use strict'

import routes from './routes.js'; 
import Snapback from "./utils/SnackbarApp.js";
import navigation from './components/navigation.js';

const router = new VueRouter({ routes: routes });

let vue = new Vue({
  el: '#app',
  vuetify: new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
    },
  }),
  router: router,

  data: function() {
    return {
      alert: false,
      textAlert: "",
      colorAlert: "",
      iconAlert: null,
      timeAlert: null,
      
    }
  },


  methods: {
    // funcion que activa la alert
    activeAlert: function (params = {}) {
      this.colorAlert = params.code == null ? params.color : "info";
      this.textAlert = params.text != null ? params.text : "";
      this.iconAlert = params.icon;

    },
  },
  
});

window.appInstance = vue;

/* funcion que da formato a las unidades de numericas */
window.formatMoney = function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
        const negativeSign = amount < 0 ? "-" : "";
        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.error(e);
    }
};
