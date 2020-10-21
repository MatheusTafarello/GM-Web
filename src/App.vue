<template>
  <div id="main-app">
    <v-app>
      <v-app-bar color="primary" app height="50">
        <NavigationBar v-if="$route.name !== 'Login'" />
      </v-app-bar>
      <v-main id="main-view">
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
  // data: () => ({})
};
</script>

<style lang="css">
html {
  overflow-y: hidden !important;
}
#main-view {
  margin-top: 50px;
}
</style>
