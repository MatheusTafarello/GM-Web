<template>
  <div id="content">
    <Popup :dialog="openDialog" @confirm="deleteItem" @cancel="openDialog = false" :type="type" />
    <FormHeader
      class="header"
      title="Assistidas"
      subTitle=" - Lista de Assistidas Cadastradas"
      :list="route"
    ></FormHeader>
    <v-card class="table">
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Busca"></v-text-field>
      <v-data-table :headers="headers" :items="assisteds" :search="search">
        <template v-slot:body="{ items }">
          <tr v-for="item in items" :key="item.cpf">
            <td>{{ item.fullName }}</td>
            <td>{{ item.cpf }}</td>
            <td>
              <v-btn @click="openPopup(item)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import FormHeader from '@/common-components/FormHeader/FormHeader.vue';
import Popup from '@/common-components/Popup/Popup.vue';
import { getAssisteds, deleteAssisted } from '@/services/assisted.js';

export default {
  components: {
    FormHeader,
    Popup,
  },
  data() {
    return {
      assisteds: [],
      route: [
        { name: 'Página Inicial', route: 'home' },
        { name: 'Gerenciar Assistidas', route: 'manage_assisteds' },
      ],
      headers: [
        { text: 'Nome', align: 'start', sortable: true, value: 'fullName' },
        { text: 'CPF', value: 'cpf', sortable: false },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      search: '',
      openDialog: false,
      selected: {},
      type: 'delete',
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.assisteds = await getAssisteds();
    },

    openPopup(item) {
      this.selected = item;
      this.openDialog = true;
    },

    closePopUp() {},

    async deleteItem() {
      await deleteAssisted(this.selected.id);
      await this.initialize();
      this.openDialog = false;
    },

    async confirmDelete() {
      console.log(this.selected);
      // await deleteAssisted(this.selected.id);
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
