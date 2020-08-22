<template>
  <div id="content">
    <FormHeader
      class="header"
      title="Autores"
      subTitle=" - Lista de Autores cadastrados no sistema"
      :list="route"
    ></FormHeader>
    <div class="table">
      <v-data-table :headers="headers" :items="desserts" class="elevation-1">
        <template class="actions" v-slot:item.actions="{ item }">
          <router-link @click="editRow(item)" class="routerLink" to="/">
            <v-icon small class="mr-2">
              mdi-pencil
            </v-icon>
          </router-link>
          <v-icon @click.stop="openDialog = true">mdi-delete</v-icon>
          <popupConfig
            :config="config"
            class="popup"
            v-model="openDialog"
            @click="deleteItem(item)"
          ></popupConfig>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import FormHeader from "@/common-components/FormHeader/FormHeader.vue";
import popupConfig from "@/common-components/Popup/popupConfig.vue";

export default {
  data() {
    return {
      route: [
        { name: "Página Inicial", route: "home" },
        { name: "Listagem de Autores", route: "manage_authors" },
      ],
      headers: [
        { text: "Nome", align: "start", sortable: true, value: "name" },
        { text: "CPF", value: "cpf", sortable: false },
        { text: "DVC", value: "dvc", sortable: false },
        { text: "ID", value: "id", sortable: false },
        { text: "Ações", value: "actions", sortable: false },
      ],
      config: {
        iconWaring: true,
        textDialog:"Tem certeza?",
        textFeed: "Deletado com sucesso",
      },
      openDialog: false,
    };
  },
  components: {
    FormHeader,
    popupConfig,
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Thomas FIller",
          cpf: "000.000.000-00",
          dvc: "xxxxxxxxxx",
          id: "000001-01.2020",
        },
        {
          name: "Marcelo Souza",
          cpf: "000.000.000-00",
          dvc: "Não possui",
          id: "000002-01.2020",
        },
      ];
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      this.desserts.splice(index, 1);
    },
  },
};
</script>
<style scoped>
#content {
  padding: 1% 3%;
}
.header {
  margin-top: 80px;
}
.table {
  margin-top: 40px;
  padding: 1% 3%;
}
.routerLink {
  text-decoration: none;
  float: left;
}

</style>
