<template>
  <v-app>
    <v-app-bar v-if="validRoute" color="primary" app height="50">
      <NavigationBar />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
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
  },
};
</script>

<style lang="css">
</style>
