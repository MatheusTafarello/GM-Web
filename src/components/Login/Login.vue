<template>
  <div class="Login primary">
    <v-card class="container" min-width="300" max-width="500">
      <h2 class="text-center">Guarda Municipal de Jundiaí</h2>
      <br />
      <v-form ref="form">
        <v-text-field
          v-model="form.username"
          class="input"
          outlined
          placeholder="Username"
          label="Username"
          :rules="rules.required"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          class="input"
          outlined
          placeholder="******"
          label="Senha"
          type="password"
          :rules="rules.required"
        ></v-text-field>
      </v-form>
      <div class="box">
        <div class="error--text">{{error}}</div>
        <v-btn @click="validate">Login</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { login, isSignedIn } from '@/services/auth.js';

export default {
  data() {
    return {
      rules: {
        required: [(v) => !!v || 'Preencha este campo'],
      },
      form: { username: '', password: '' },
      error: '',
    };
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        await login(this.form);
        if (isSignedIn()) {
          this.$router.push('/home');
        }
      }
    },
  },
};
</script>

<style scoped>
.Login {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
}
.container {
  padding: 20px 40px;
}
.box {
}
</style>