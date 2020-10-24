<template>
  <div class="Login primary">
    <v-card class="container" min-width="200" max-width="800">
      <div>
        <img class="imgLogin" src="@/assets/imagemLogin.jpg" />
      </div>
      <div class="form-login">
        <div class="label-login">Login</div>
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
          <div class="box">
            <div class="error--text">{{ error }}</div>
            <v-btn class="lightGreen" @click="validate">ENTRAR</v-btn>
          </div>
        </v-form>
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
template {
  background: linear-gradient(
    180deg,
    #acceed 0%,
    rgba(215, 229, 247, 0.760312) 58.33%,
    rgba(215, 221, 239, 0.22) 100%
  );
}
.Login {
  background: linear-gradient(
    180deg,
    #a1c4e6 0%,
    rgba(215, 229, 247, 0.760312) 58.33%,
    rgb(215, 221, 239) 100%
  );
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
}
.container {
  padding: 80px 22px;
  height: 460px;
  box-shadow: 2px 11px 19px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
}
.box {
  display: flex;
  justify-content: center;
}
.lightGreen {
  position: absolute;
  width: 134px;
  filter: drop-shadow(0px 4px 9px rgba(0, 0, 0, 0.25));
  color: white;
}

.form-login {
  display: block;
}

.imgLogin {
  width: 380px;
  height: 299px;
}
.label-login {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 30px;
  padding-bottom: 32px;
}
.input {
  width: 350px;
  border: #a1c4e6;
}
</style>