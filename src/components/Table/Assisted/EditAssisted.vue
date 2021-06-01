<template>
  <div class="assisted-form">
    <Popup :dialog="openDialog" @cancel="openDialog = false" :type="type" />
    <FormHeader class="header" title="Editar Assistida" subTitle :list="routes" />
    <div :class="['forms', $vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop']">
      <AssistedForm class="container" @sendData="fetchData" />
      <AddressForm @sendData="fetchData" class="container" />
    </div>
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
        raised 
        color="success" 
        :loading="isLoading" 
        @click="editAssisted, openPopupEdit(edit)"
      >
      Concluir
      </v-btn>

    </div>
  </div>  
</template> 

<script>
import FormHeader from '@/common-components/FormHeader/FormHeader.vue';
import Popup from '@/common-components/Popup/Popup.vue';
import AddressForm from '@/common-components/AddressForm/AddressForm.vue';
import AssistedForm from '../../Register/Assisted/AssistedForm/AssistedForm.vue';
import { editAssisted } from '@/services/assisted.js';

export default {
  data: () => ({
    routes: [
      { name: 'Pagina Inicial', route: 'home' },
      { name: 'Gerenciar Assistidas', route: 'manage_assisteds' },
      { name: 'Editar Assistida', route:'' }
    ],
    form: {},
    isLoading: false,
    openDialog: false,
    type: 'delete'
  }),
  methods: {
    fetchData(form) {
      Object.keys(form).map((key) => {
        this.form[key] = form[key];
      });
    },
    async editAssisted() {
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

        let status = editAssisted(fd);
        if (status) this.$router.push('/manage_assisteds');
      }
      this.isLoading = false;
    },

    cancel() {
      this.$router.push('/manage_assisteds');
    },
    openPopupEdit(edit){
      this.type='editAssisted';
      this.selected = edit;
      this.openDialog = true;
    },
  },
  components: {
    FormHeader,
    AddressForm,
    AssistedForm,
    Popup,
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