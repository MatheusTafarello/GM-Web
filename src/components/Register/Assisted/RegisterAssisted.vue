<template>
  <div class="assisted-form">
    <FormHeader class="header" title="Registrar Assistida" subTitle :list="routes" />
    <div :class="['forms', $vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop']">
      <AssistedForm class="container" @sendData="fetchData" />
      <AddressForm @sendData="fetchData" class="container" />
    </div>
    <div class="buttons">
      <v-btn raised color="gray" @click="cancel">Cancelar</v-btn>
      <v-btn raised color="success" :loading="isLoading" @click="createAssisted">Criar</v-btn>
    </div>
  </div>
</template>

<script>
import FormHeader from '@/common-components/FormHeader/FormHeader.vue';
import AddressForm from '@/common-components/AddressForm/AddressForm.vue';
import AssistedForm from './AssistedForm/AssistedForm.vue';
import { registerAssisted } from '@/services/assisted.js';

export default {
  data: () => ({
    routes: [
      { name: 'Pagina Inicial', route: 'home' },
      { name: 'Assistida', route: 'register_assisted' },
    ],
    form: {},
    isLoading: false,
  }),
  methods: {
    fetchData(form) {
      Object.keys(form).map((key) => {
        this.form[key] = form[key];
      });
    },
    async createAssisted() {
      const { assistedValid, addressValid } = this.form;
      const form = { ...this.form };
      this.isLoading = true;
      if (assistedValid && addressValid) {
        const fd = new FormData();
        fd.append('photograph', form.image, 'assistedPhoto.jpg');
        for (const field in form) {
          if (
            field === 'assistedValid' ||
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

        let status = registerAssisted(fd);
        if (status) this.$router.push('/home');
      }
      this.isLoading = false;
    },

    cancel() {
      this.$router.push('/home');
    },
  },
  components: {
    FormHeader,
    AddressForm,
    AssistedForm,
  },
};
</script>

<style>
.assisted-form {
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