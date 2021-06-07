<template>
  <div>
      <Popup :dialog="openDialog" @cancel="openDialog = false" :type="type" />
    <FormHeader class="header" title="Editar Usuário" :list="routes" />
    <div :user="users">
      <v-form class="form">
        <p class="subtitle">Nome Completo</p>
        <v-text-field
          v-model="form.fullName"
          label= "Nome completo"
          dense
          outlined
          :rules="rules.required"
        ></v-text-field>

        <p class="subtitle">Nome de Usuário</p>
        <v-text-field
          v-model="form.login"
          label= "Nome de usuário"
          dense
          outlined
          :rules="rules.login"
        ></v-text-field>

        <p class="subtitle">Senha</p>
        <v-text-field
          v-model="form.password"
          dense
          outlined
          name="password"
          label="Insira a senha"
          :append-icon="vpassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="() => (vpassword = !vpassword)"
          :type="vpassword ? 'password' : 'text'"
          :rules="rules.password"
        ></v-text-field>

        <p class="subtitle">E-mail</p>
        <v-text-field
          v-model="form.email"
          label="Insira seu E-mail"
          dense
          outlined
          :rules="rules.email"
          ref="email"
        ></v-text-field>

        <p class="subtitle">Permissão</p>
        <v-select
          v-model="selectedPermission"
          dense
          outlined
          label="Selecione o tipo de permissão"
          :items="permissions"
        ></v-select>

        <div class="buttons">
            <v-btn 
              class="btn" 
              raised 
              color="gray" 
              @click="cancel"
            >
            Cancelar
            </v-btn>

            <v-btn 
              class="btn" 
              elevation="2" 
              color="success"
              @click="sendUser()"
            >
            Salvar
            </v-btn>
    </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import Popup from '@/common-components/Popup/Popup.vue';
import FormHeader from '@/common-components/FormHeader/FormHeader.vue';
import { getUser, editUser } from '@/services/user.js';
export default {
  data: () => ({
    users: [],
    vpassword: String,
    form: { fullName: '', login: '', email: '', permissionId: '', password: ''},
    data:'',
    selectedPermission: '',
    routes: [
      { name: 'Pagina Inicial', route: 'home' },
      { name: 'Gerenciar Funcionários', route: 'manage_users' },
      { name: 'Editar Funcionário', route: ''}
    ],
    openDialog: false,
    isLoading: false,
    type: 'delete',

    permissions: ['Administrador', 'Patrulha'],

    rules: {
      required: [(v) => !!v || 'O campo é obrigatório'],
      password: [
        (v) =>
          /^(?=.{8,})/.test(v) ||
          'Sua senha deve conter pelo menos 8 caracteres incluindo: uma letra maiúscula, um símbolo e um número.',
      ],
      email: [(v) => /^(?=.*[@])/.test(v) || "Seu E-mail deve conter o caractere '@'"],
      login: [
        (v) => v.length <= 10 || 'Nome de usuário muito longo.',
        (v) => !!v || 'O campo é obrigatório',
      ],
    },
  }),
   async created() {
    await this.initialize();
  },
  methods: {
    async initialize() {
      this.user = await getUser(this.$route.query.id);
      this.form = this.user;
      this.form.password = '';
    },
    async sendUser() {
      const id = this.$route.query.id;
      if (this.selectedPermission == 'Adminstrador') {
        this.form.permissionId = 2;
      } else {
        this.form.permissionId = 3;
      }
      let status = await editUser(id, this.form);
      this.type='editUser';
      this.openDialog = true;
      if (status) this.$router.push('/home')
    },
    cancel() {
      this.$router.push('/manage_users');
    },
     },
    components: {
    FormHeader,
    Popup,
  },
};
</script>

<style scoped>
.subtitle {
  font-size: 18px;
}

.header {
  padding: 1% 3%;
}

.form {
  margin-top: 5px;
  padding: 1% 30%;
}

.buttons {
  position: relative;
  bottom: 15%;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 1rem;
}

.btn {
  margin-right: 0.7rem;
  margin-left: 0.3rem;
}
</style>