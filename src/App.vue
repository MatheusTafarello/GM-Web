<template>
  <div id="main-app">
    <v-app>
      <v-app-bar v-if="validRoute" color="primary" app height="50">
        <NavigationBar />
      </v-app-bar>
      <v-main :id="marginId">
        <router-view />
      </v-main>
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
      console.log(this.$route.name);
      return this.$route.name !== 'Login';
    },
    marginId() {
      return this.$route.name !== 'Login' ? 'main-view' : 'main';
    },
  },
};
</script>

<style lang="css">
#main-view {
  margin-top: 50px;
}
</style>
