<template>
  <div>
    <FormHeader class="header" title="Cadastrar" :list="routes" />
    <div>
      <v-form class="form" ref="form">
        <p class="subtitle">Nome Completo</p>
        <v-text-field
          v-model="form.fullName"
          label="Nome completo"
          dense
          outlined
          :rules="rules.required"
        ></v-text-field>

        <p class="subtitle">Nome de Usuário</p>
        <v-text-field
          v-model="form.login"
          label="Nome utilizado para login"
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
        <v-btn @click="sendForm" class="buttons" elevation="2" color="success">Criar</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { createUser } from '@/services/user.js';
import FormHeader from '@/common-components/FormHeader/FormHeader.vue';
export default {
  components: {
    FormHeader,
  },
  data: () => ({
    vpassword: String,
    form: { fullName: '', login: '', email: '', permissionId: '', password: '' },
    selectedPermission: '',
    routes: [
      { name: 'Pagina Inicial', route: 'home' },
      { name: 'Usuário', route: 'register_user' },
    ],

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
  methods: {
    async sendForm() {
      if (this.selectedPermission == 'Adminstrador') {
        this.form.permissionId = 2;
      } else {
        this.form.permissionId = 3;
      }
      let status = await createUser(this.form);
      if (status) this.$router.push('/home');
    },
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
  width: 30%;
  margin: 0% 35%;
}
</style>