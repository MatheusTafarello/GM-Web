<template>
  <div id="main-app">
    <v-app>
      <v-app-bar v-if="validRoute" color="primary" app height="50">
        <NavigationBar />
      </v-app-bar>
      <div :style="style">
        <router-view />
      </div>
    </v-app>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar/NavigationBar';
export default {
  name: 'App',
  components: {
    NavigationBar,
  },
  computed: {
    validRoute() {
      return this.$route.name !== 'Login';
    },
    style() {
      let obj = {};
      if (process.env.NODE_ENV == 'development') {
        obj = { marginTop: '50px' };
      }
      return obj;
    },
  },
};
</script>

<style lang="css">
#main-view {
  /* margin-top: 50px; */
}
</style>
