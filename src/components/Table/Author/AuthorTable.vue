<template>
  <div id="content">
    <Popup :dialog="openDialog" @confirm="deleteItem" @cancel="openDialog = false" :type="type" />
    <FormHeader
      class="header"
      title="Autores"
      subTitle=" - Lista de Autores Cadastrados"
      :list="route"
    ></FormHeader>
    <v-card class="table">
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Busca"></v-text-field>
      <v-data-table :headers="headers" :items="authors" :search="search">
        <template v-slot:body="{ items }">
          <tr v-for="item in items" :key="item.cpf">
            <td>{{ item.fullName }}</td>
            <td>{{ item.cpf }}</td>
            <td>{{ item.dvc }}</td>
            <td>
              <v-btn @click="openPopupItem(item)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn @click=router-link :to ="{ path: '/edit_author', query: {id: item.id} }" icon>
                <v-icon>mdi-account-edit</v-icon> 
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
import { getAuthors, deleteAuthor } from '@/services/author.js';

export default {
  components: {
    FormHeader,
    Popup,
  },
  data() {
    return {
      authors: [],
      route: [
        { name: 'Página Inicial', route: 'home' },
        { name: 'Gerenciar Autores', route: 'manage_authors' },
      ],
      headers: [
        { text: 'Nome', align: 'start', sortable: true, value: 'fullName' },
        { text: 'CPF', value: 'cpf', sortable: false },
        { text: 'DVC', value: 'dvc', sortable: false },
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
      this.authors = await getAuthors();
    },
    openPopupItem(item) {
      this.type='delete';
      this.selected = item;
      this.openDialog = true;
    },
    async deleteItem() {
      await deleteAuthor(this.selected.id);
      this.authors = [];
      await this.initialize();
      this.openDialog = false;
    },
    openPopupEdit(edit){
      this.type='editAuthor';
      this.selected = edit;
      this.openDialog = true;
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