import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#23527c',
        accent: '#e1e9f2',
        secondary: '#ddd',
        information: '#58b7fa',
        success: '#64bb4e',
        warning: '#ffef61',
        danger: '#ff5858',
        dark: '#4a4a4a',
        light: '#e9e9e9'
      },

    }
  }
});
