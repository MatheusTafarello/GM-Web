<template>
  <div class="author-form">
    <FormHeader class="header" title="Registrar Autor" :list="routes" />
    <div :class="['forms', $vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop']">
      <AuthorForm class="container" @sendData="fetchData" />
      <AddressForm @sendData="fetchData" class="container" />
    </div>
    <div class="buttons">
      <v-btn raised color="gray">Cancelar</v-btn>
      <v-btn raised color="success" :loading="isLoading" @click="createAuthor">Criar</v-btn>
    </div>
  </div>
</template>

<script>
import FormHeader from "@/common-components/FormHeader/FormHeader.vue";
import AddressForm from "@/common-components/AddressForm/AddressForm.vue";
import AuthorForm from "./AuthorForm/AuthorForm.vue";
import {registerAuthor} from "@/services/author.js";

export default {
  components: {
    FormHeader,
    AuthorForm,
    AddressForm
  },
  data: () => ({
    routes: [
      { name: "Pagina Inicial", route: "home" },
      { name: "Autor", route: "register_author" }
    ],
    form: {},
    isLoading: false
  }),

  methods: {
    fetchData(form) {
      Object.keys(form).map(key => {
        this.form[key] = form[key];
      });
      
      console.log('Dados: ', this.form)
    },
    async createAuthor() {
      const { authorValid, addressValid } = this.form;
      this.revertFormat();
      const form = { ...this.form };
      this.isLoading = true;
      if (authorValid && addressValid) {
        const fd = new FormData();
        fd.append("photography", form.image, "authorPhoto.jpg");
        delete form.image;

        fd.append("information", form);

        console.log('CPF: ', this.form.cpf)
        console.log('CEP: ', this.form.cep)

        registerAuthor(fd);
      }
      this.isLoading = false;
    },
    revertFormat(){

      this.form.cpf = this.form.cpf.replace(".","");
      this.form.cpf = this.form.cpf.replace("-","");
      this.form.cpf = this.form.cpf.replace(".","");

      this.form.cep = this.form.cep.replace("-","");
    }
  }
};
</script>

<style scoped lang="css">
.author-form {
  padding: 1% 3%;
}

.forms {
  display: grid;
  max-width: 100%;
  min-height: 95%;
  justify-content: center;
}

.desktop {
  grid-template-columns: 50% 50%;
}

.mobile {
  grid-template-rows: repeat(auto, 3);
  grid-template-columns: 1fr;
}

.container {
  width: 80%;
  margin-top: 20px;
  padding: 0;
}
.buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 30px;
}
</style>