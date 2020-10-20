<template>
    <div class="form-measure">
        <FormHeader class="header" title="Cadastrar Medida" :list="routes" />
        <MeasureForm class="container" @sendData="fetchData" />     
        <div class="buttons">
            <v-btn raised color="gray">Cancelar</v-btn>
            <v-btn raised color="success" :loading="isLoading" @click="createMeasure">Criar</v-btn>
        </div>
    </div>
</template>
<script>
import FormHeader from '@/common-components/FormHeader/FormHeader.vue';
import MeasureForm from './MeasureForm/MeasureForm.vue';
import {registerMeasure} from "@/services/measure.js";

export default {
    components:{
        FormHeader,
        MeasureForm
    },
    data: () => ({
    routes: [
      { name: "Pagina Inicial", route: "home" },
      { name: "Medida Protetiva", route: "register_measure" }
    ],
    form: {},
    isLoading: false
    }),
    methods:{
      fetchData(form) {
        Object.keys(form).map(key => {
          this.form[key] = form[key];
        });
      },
      async createMeasure(){
        let form = {...this.form};
        this.isLoading = true;

        form.validity = this.dateFormat(form.validity);
        
        let status = await registerMeasure(form);
        if(status)this.$router.push('/home');

        this.isLoading = false;
      },
      dateFormat(date){
        if(date)return new Date(date).toISOString();
        return null;
      }
    }
    
}
</script>

<style scoped>

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
