<template>
  <div class="form-measure">
    <FormHeader class="header" title="Cadastrar Medida" :list="routes" />
    <MeasureForm class="measure-form" @sendData="fetchData" />
    <div class="buttons">
      <v-btn raised color="gray" @click="cancel">Cancelar</v-btn>
      <v-btn raised color="success" :loading="isLoading" @click="createMeasure">Criar</v-btn>
    </div>
  </div>
</template>
<script>
import FormHeader from '@/common-components/FormHeader/FormHeader.vue';
import MeasureForm from './MeasureForm/MeasureForm.vue';
import { registerMeasure } from '@/services/measure.js';

export default {
  components: {
    FormHeader,
    MeasureForm,
  },
  data: () => ({
    routes: [
      { name: 'Pagina Inicial', route: 'home' },
      { name: 'Medida Protetiva', route: 'register_measure' },
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
    async createMeasure() {
      let form = { ...this.form };
      this.isLoading = true;

      form.validity = this.dateFormat(form.validity);

      let status = await registerMeasure(form);
      if (status) this.$router.push('/home');

      this.isLoading = false;
    },
    dateFormat(date) {
      if (date) return new Date(date).toISOString();
      return null;
    },

    cancel() {
      this.$router.push('/home');
    },
  },
};
</script>

<style scoped>
.form-measure {
  margin: 15px;
}
.header {
  margin: 20px;
}

.buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 30px;
}
</style>
