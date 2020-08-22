<template>
  <v-app>
    <v-content>
      <NavigationBar  v-if="$route.name !== 'Login'" />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavigationBar from "./components/NavigationBar/NavigationBar";
export default {
  name: "App",
  components: {
    NavigationBar,
  },
  // data: () => ({})
};
</script>

<style lang="scss"></style>
