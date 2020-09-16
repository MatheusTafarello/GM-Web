<template>
  <div id="content">
    <Popup :dialog="openDialog" @confirm="deleteItem" @cancel="openDialog = false" :text="type"/>
    <FormHeader
      class="header"
      title="Autores"
      subTitle=" - Lista de Autores Cadastrados"
      :list="route"
    ></FormHeader>
    <div class="table">
      <v-data-table :headers="headers" :items="authors" class="elevation-1">
        <template v-slot:body="{ items }">
          <tr v-for="item in items" :key="item.id">
            <td>{{item.fullName}}</td>
            <td>{{ item.cpf }}</td>
            <td>{{ item.dvc }}</td>
            <td>{{ item.id }}</td>
            <td>
              <v-btn @click="openPopup(item)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
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
        { text: 'ID', value: 'id', sortable: false },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      openDialog: false,
      selected: {},
      type:"delete"
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.authors = await getAuthors();
    },
    openPopup(item) {
      this.selected = item;
      this.openDialog = true;
    },
    async deleteItem() {
      await deleteAuthor(this.selected.id);
      await this.initialize();
      this.openDialog = false;
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