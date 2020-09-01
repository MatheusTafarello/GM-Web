<template>
  <div id="content">
    <FormHeader
      class="header"
      title="Assistidas"
      subTitle=" - Lista de Assistidas Cadastradas"
      :list="route"
    ></FormHeader>
    <div class="table">
      <v-data-table :headers="headers" :items="desserts" class="elevation-1">
        <template class="actions" v-slot:[`{item.actions}`]="{ item }">
          <router-link @click="editRow(item)" class="routerLink" to="/">
            <v-icon small class="mr-2">mdi-pencil</v-icon>
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
import FormHeader from '@/common-components/FormHeader/FormHeader.vue';
import popupConfig from '@/common-components/Popup/popupConfig.vue';

export default {
  data() {
    return {
      route: [
        { name: 'Página Inicial', route: 'home' },
        { name: 'Gerenciar Assistidas', route: 'manage_assisteds' },
      ],
      headers: [
        { text: 'Nome', align: 'start', sortable: true, value: 'name' },
        { text: 'CPF', value: 'cpf', sortable: false },
        { text: 'Celular', value: 'celular', sortable: false },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      config: {
        iconWaring: true,
        textDialog: 'Tem certeza?',
        textFeed: 'Deletada com sucesso',
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
          name: 'Robertinha Carla',
          cpf: '000.000.000-00',
          celular: '(11) 90000-0000',
          id: '000001-01.2020',
        },
        {
          name: 'Ana Paula',
          cpf: '000.000.000-00',
          celular: '(11) 90000-0000',
          id: '000002-01.2020',
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
