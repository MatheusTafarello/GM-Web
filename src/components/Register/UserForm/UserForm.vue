<template>

  <div>
    <FormHeader class="header" title="Cadastrar" :list="routes" />
    <div>
     <v-form class="form">
       <p class= "subtitle">Nome Completo</p>
        <v-text-field
              label="Nome completo"
              dense
              outlined
              :rules="rules.required"
        ></v-text-field>

  <p class= "subtitle">Nome de Usuário</p>
        <v-text-field
              label="Nome utilizado para login"
              dense
              outlined
              :rules="rules.required"
        ></v-text-field>

  <p class= "subtitle">Senha</p>
        <v-text-field
              dense
              outlined
              name="password"
              :vpassword="defaultpass"
              label="Insira a senha"
              :append-icon="vpassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="() => (vpassword = !vpassword)"
              :type="vpassword ? 'password' : 'text'"
              :rules="rules.password"
        ></v-text-field>

  <p class= "subtitle">E-mail</p>
        <v-text-field
              label="Insira seu E-mail"
              dense
              outlined
              :rules="rules.email"
        ></v-text-field>
  <p class= "subtitle">Permissão</p>
        <v-select
              outlined
              label="Selecione o tipo de permissão"
              :items="perm"
              dense
        >
        </v-select>   
        <v-btn class="buttons"
              color="primary"
              elevation="2"
              @click="validate"
        >Limpar</v-btn> 
        <v-btn class="buttons"
              elevation="2"
              color="success"
              @click="validate"
        >Cadastrar</v-btn>

      </v-form>
    </div>  
  </div>

</template>

<script>
import FormHeader from "@/common-components/FormHeader/FormHeader.vue";
export default {
    components:{
        FormHeader
    },
    data:() => ({

        routes: [
          { name: "Pagina Inicial", route: "home" },
          { name: "Usuário", route: "register_user" }],

        perm:[
          "Administrador","Usuário"],

        vpassword: String,

        rules:{
          required: [v => !!v || "O campo é obrigatório"],
          password: [v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%¨&*^])(?=.{8,})/.test(v) || "Sua senha deve conter pelo menos 8 caracteres incluindo: uma letra maiúscula, um símbolo e um número."],
          email: [v => /^(?=.*[@])/.test(v) || "Seu E-mail deve conter o caractere '@'"]}

    })
    
}
</script>

<style scoped>
.subtitle{
  font-size: 23px;
}
.header{
 padding: 1% 3%;
}
.form {
  margin-top: 5px;
  padding: 1% 30%;
}
.buttons {
  margin: 0px 7vh;
  width: 30%;
}
</style>