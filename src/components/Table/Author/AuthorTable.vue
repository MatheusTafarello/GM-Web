<template>
  <div id="content">
    <FormHeader
      class="header"
      title="Autores"
      subTitle=" - Lista de Autores cadastrados no sistema"
      :list="route"
    ></FormHeader>
    <div class="table">
      <v-card>
        <div class="card-body table-responsive p-0">
          <v-simple-table class="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>DVC</th>
                <th>ID</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.fullName }}</td>
                <td>{{ user.cpf }}</td>
                <td>{{ user.dvc }}</td>
                <td>{{ user.id }}</td>
                <td>
                  <router-link @click="editRow(item)" class="routerLink" to="/">
                    <v-icon small class="mr-2">mdi-pencil</v-icon>
                  </router-link>
                  <v-icon @click.stop="openDialogs(user.id)">mdi-delete</v-icon>
                </td>
              </tr>
            </tbody></v-simple-table
          >
        </div>
          <popupConfig
            :config="config"
            class="popup"
            v-model="openDialog"
            :onConfirm="deleteUser"
            :onCancel="cancelButton"
          ></popupConfig>
      </v-card>
      <div class="card-footer">
        <v-pagination :length="users" @pagination-change-page="getResults"></v-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import FormHeader from '@/common-components/FormHeader/FormHeader.vue';
import popupConfig from '@/common-components/Popup/popupConfig.vue';
import axios from 'axios';

export default {
  data() {
    return {
      route: [
        { name: 'Página Inicial', route: 'home' },
        { name: 'Listagem de Autores', route: 'manage_authors' },
      ],
      config: {
        iconWaring: true,
        textDialog: 'Tem certeza?',
        textFeed: 'Deletado com sucesso',
      },
      onConfirm: {},
      onCancel: {},
      openDialog: false,
      users: {},
      selectedId: {}
    };
  },
  components: {
    FormHeader,
    popupConfig,
  },

  created() {
    this.loadUsers();
  },

  methods: {
    loadUsers() {
      const token = localStorage.getItem('token');
      const headers = {Authorization: token};
      axios.get(process.env.VUE_APP_API + 'admin/author', headers).then((res) => {
        this.users = res.data;
      });
    },
    deleteUser() {
      const token = localStorage.getItem('token');
      const headers = {Authorization: token};
      this.openDialog = false;
      axios.delete(process.env.VUE_APP_API + 'admin/author', headers).then(() => {
        this.users.splice(this.users.indexOf(this.users[this.selectedId]) -1, 1);
        this.openDialog = false;
      });
    },
    cancelButton() {
      this.openDialog = false;
    },
    openDialogs(id){
      this.selectedId = id;
      this.openDialog = true;
    }
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
