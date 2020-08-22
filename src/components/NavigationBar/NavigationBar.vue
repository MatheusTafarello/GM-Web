<template>
  <v-card flat tile>
    <v-toolbar dense color="primary">
      <v-toolbar-title>
        <v-btn text to="home">
          <v-icon color="white">mdi-home</v-icon>
        </v-btn>
      </v-toolbar-title>

      <Dropdown :items="assistedItems" icon="mdi-heart" color="red">
        <div class="font-weight-light">Assistida</div>
      </Dropdown>
      <Dropdown :items="authorItems" icon="mdi-human-male" color="blue lighten-4">
        <div class="font-weight-light">Autor</div>
      </Dropdown>

      <v-btn text color="white" class="text-capitalize font-weight-light">
        <v-icon color="green" left>mdi-map</v-icon>Mapa
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn text color="accent" class="text-capitalize font-weight-light">
        {{ username }}
        <v-icon right>mdi-account</v-icon>
      </v-btn>

      <v-tooltip bottom color="dark">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon color="accent" to="/">
            <v-icon>mdi-door-open</v-icon>
          </v-btn>
        </template>
        <span>Sair</span>
      </v-tooltip>
    </v-toolbar>
  </v-card>
</template>

<script>
import Dropdown from "@/common-components/Dropdown/Dropdown.vue";

export default {
  name: "NavigationBar",
  components: {
    Dropdown
  },
  data: () => ({
    assistedItems: [
      {
        title: "Registrar Assistida",
        icon: "mdi-account-plus",
        route: "register_assisted"
      },
      {
        title: "Criar Medida Protetiva",
        icon: "mdi-shield-plus",
        route: "measure_form"
      },
      {
        title: "Gerenciar Assistidas",
        icon: "mdi-table-account",
        route: "manage_assisteds"
      }
    ],
    authorItems: [
      {
        title: "Registrar Autor",
        icon: "mdi-account-plus",
        route: "register_author"
      },
      {
        title: "Gerenciar Autores",
        icon: "mdi-table-account",
        route: "manage_authors"
      }
    ],
    username: "Claudia",
    isHome: null
  }),
  watch: {
    $route(to) {
      this.isHome = to.name == "Home";
    }
  }
};
</script>

<style scoped lang="scss">
span {
  color: #fff;
}
</style>
