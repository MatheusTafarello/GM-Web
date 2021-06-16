<template>
  <div class="assisted-form">
    <Popup :dialog="openDialog" @cancel="openDialog = false" :type="type" />
    <FormHeader class="header" title="Editar Assistida" subTitle :list="routes" />
    <div :class="['forms', $vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop']">
      <EditAssistedForm class="container" @sendData="fetchData" />
      <EditAssistedAddressForm @sendData="fetchData" class="container" />
    </div>
    <div class="buttons">

      <v-btn 
        class="btn" 
        raised 
        color="gray" 
        @click="cancel()"
      >
      Cancelar
      </v-btn>

      <v-btn 
        class="btn" 
        raised 
        color="success" 
        :loading="isLoading" 
        @click="sendAssisted()" 
      >
      Concluir
      </v-btn>

    </div>
  </div>  
</template> 

<script>
import FormHeader from '@/common-components/FormHeader/FormHeader.vue';
import Popup from '@/common-components/Popup/Popup.vue';
import EditAssistedAddressForm from './EditAssistedAddressForm.vue';
import EditAssistedForm from './EditAssistedForm.vue'
import { editAssisted } from '@/services/assisted.js';

export default {
  data: () => ({
    routes: [
      { name: 'Pagina Inicial', route: 'home' },
      { name: 'Gerenciar Assistidas', route: 'manage_assisteds' },
      { name: 'Editar Assistida', route:'' }
    ],
    form: {},
    openDialog: false,
    isLoading: false,
    type: 'delete'
  }),

  methods: {
    fetchData(form) {
      Object.keys(form).map((key) => {
        this.form[key] = form[key];
      });
    },
    async sendAssisted() {
      console.log(this.form)
      const id = this.$route.query.id;
      const { assistedValid, addressValid } = this.form;
      const form = { ...this.form };

      //visualizar qual dos campos está como false/undefined
      console.info("assistida: ", assistedValid, "endereço: ", addressValid)

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
            this.isLoading = true;
            // continue;
          } else {
            if (field === 'cep' || field === 'cpf') {
              let sanitizedField = form[field].replaceAll('-', '');
              sanitizedField = sanitizedField.replaceAll('.', '');
              fd.append(`${field}`, sanitizedField);
            } else {
              if (field !== 'id') {
                fd.append(`${field}`, form[field]);
              }
            }
          } 
        }
        let requestForm = {
        cpf: '', 
        fullName: '', 
        observation: '',
        // photograph: 'image/*',

        cep: '', 
        city: '',
        district: '',
        number: '',
        state: '',
        street: '',

      };

      let sanitizedCPF = this.form.cpf.replaceAll('-', '');
      sanitizedCPF = sanitizedCPF.replaceAll('.', '');

      let sanitizedCEP = this.form.cep.replaceAll('-', '');
      sanitizedCEP = sanitizedCEP.replaceAll('.', '');

      requestForm.cpf = sanitizedCPF;
      requestForm.fullName = this.form.fullName;
      requestForm.observation = this.form.observation;
      // requestForm.photograph = this.form.photograph;
      requestForm.cep = sanitizedCEP;
      requestForm.city = this.form.city;
      requestForm.district = this.form.district;
      requestForm.number = this.form.number;
      requestForm.state = this.form.state;
      requestForm.street = this.form.street;

        let status = await editAssisted(id, requestForm);
        this.type='editAssisted';
        this.openDialog = true;
        if (status) this.$router.push('/manage_assisteds');
      }
    },
    cancel() {
      this.$router.push('/manage_assisteds');
    },
  },

  components: {
    FormHeader,
    EditAssistedAddressForm,
    EditAssistedForm,
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