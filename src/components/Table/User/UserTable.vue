<template>
  <div id="content">
    <Popup :dialog="openDialog" @confirm="deleteItem" @cancel="openDialog = false" :type="type" />
    <FormHeader class="header" title="Usuários" :list="route"></FormHeader>
    <v-card class="table">
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Busca"></v-text-field>
      <v-data-table :headers="headers" :items="users" :search="search">
        <template v-slot:body="{ items }">
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.fullName }}</td>
            <td>{{ item.login }}</td>
            <td>{{ item.email }}</td>
            <td>
              {{
                item.permissionId === 1
                  ? 'Super Administrador'
                  : item.permissionId == 2
                  ? 'Administrator'
                  : 'Patrulha'
              }}
            </td>
            <td>
              <v-btn id='delete' @click="openPopupItem(item)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn id='edit' @click=router-link :to ="{ path: '/edit_user' }" icon>
                <v-icon>mdi-cogs</v-icon>
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
import { getUsers, deleteUser } from '@/services/user.js';

export default {
  components: {
    FormHeader,
    Popup,
  },
  data() {
    return {
      users: [],
      route: [
        { name: 'Página Inicial', route: 'home' },
        { name: 'Gerenciar Funcionários', route: 'manage_users' },
      ],
      headers: [
        { text: 'Nome', align: 'start', sortable: true, value: 'name' },
        { text: 'Login', value: 'login', sortable: false },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Permissão', value: 'permission', sortable: false },
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
      this.users = await getUsers();
    },
    openPopupItem(item) {
      this.type='delete';
      this.selected = item;
      this.openDialog = true;
    },
    async deleteItem() {
      console.log(this.selected);
      await deleteUser(this.selected.id);
      await this.initialize();
      this.openDialog = false;
    },
    openPopupEdit(edit){
      this.type='editUser';
      this.selected = edit;
      this.openDialog = true;
    },
  },
};
</script>
<style scoped>
#content {
  padding: 0 3%;
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
