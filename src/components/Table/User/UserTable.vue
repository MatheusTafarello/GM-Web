<template>
  <div id="content">
    <Popup :dialog="openDialog" @confirm="deleteItem" @cancel="openDialog = false" :type="type" />
    <FormHeader class="header" title="Usuários" :list="route"></FormHeader>
    <div class="table">
      <v-data-table :headers="headers" :items="users" class="elevation-1">
        <template v-slot:body="{ items }">
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.fullName }}</td>
            <td>{{ item.login }}</td>
            <td>{{ item.email }}</td>
            <td>
              {{
                item.permissionId === 1
                  ? 'Super Administrador'
                  : item.perpermissionId === 2
                  ? 'Administrator'
                  : 'Patrulha'
              }}
            </td>
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
    openPopup(item) {
      this.selected = item;
      this.openDialog = true;
    },
    async deleteItem() {
      console.log(this.selected);
      await deleteUser(this.selected.id);
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
