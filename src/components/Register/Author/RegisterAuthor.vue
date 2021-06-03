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
      
    },
    async createAuthor() {
      const { authorValid, addressValid } = this.form;
      
      const form = { ...this.form };

      if (authorValid && addressValid) {
        this.isLoading = true;
        const fd = new FormData();
        fd.append('photograph', form.image, 'authorPhoto.jpg');
        for (const field in form) {
          if (
            field === 'authorValid' ||
            field === 'addressValid' ||
            field === 'image' ||
            field === 'photograph'
          ) {
            continue;
          } else {
            if (field === 'cep' || field === 'cpf') {
              let sanitizedField = form[field].replaceAll('-', '');
              sanitizedField = sanitizedField.replaceAll('.', '');
              fd.append(`${field}`, sanitizedField);
            } else {
              fd.append(`${field}`, form[field]);
            }
          }
        }
        delete form.image;

        let status = await registerAuthor(fd)
        if(status)this.$router.push('/home');
        this.isLoading = false;
      }
      }
    }
  }

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