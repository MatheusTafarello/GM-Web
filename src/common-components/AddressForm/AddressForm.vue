<template>
  <div>
    <h1 class="headline">Endereço</h1>
    <v-form v-model="form.addressValid" class="form" ref="form" @input="$emit('sendData', form)">
      <div style="display: flex;">
        <v-text-field
          v-model="form.cep"
          ref="cep"
          @blur="getAddress(form.cep)"
          label="CEP"
          :rules="rules.cep"
          maxlength="9"
          dense
          outlined
          validate-on-blur
        />
        <v-text-field
          v-model="form.number"
          label="N°"
          dense
          outlined
          :rules="rules.number"
          style="width: 5%; margin-left:10px"
          validate-on-blur
        />
      </div>
      <v-text-field v-model="form.street" label="Endereço" :rules="rules.street" dense outlined />
      <v-text-field
        v-model="form.district"
        class="address-input"
        label="Bairro"
        :rules="rules.district"
        dense
        outlined
      />
      <div style="display: flex;">
        <v-text-field v-model="form.city" label="Cidade" :rules="rules.city" dense outlined />
        <v-autocomplete
          v-model="form.state"
          label="Estado"
          :items="states"
          :rules="rules.state"
          dense
          outlined
          no-data-text="Nenhuma correspondência"
          style="width: 5%; margin-left:10px"
        />
      </div>
    </v-form>
  </div>
</template>

<script>
import cepPromise from "cep-promise";

export default {
  data: () => ({
    form: {
      addressValid: false,
      cep: "",
      number: "",
      street: "",
      district: "",
      city: "",
      state: ""
    },
    states: [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO"
    ],
    rules: {
      cep: [
        
        v => !!v || "O campo é obrigatório"
      ],
      number: [
        v => !!v || "O campo é obrigatório",
        v => !isNaN(v) || "Deve ser um número"
      ],
      street: [v => !!v || "O campo é obrigatório"],
      district: [v => !!v || "O campo é obrigatório"],
      state: [v => !!v || "O campo é obrigatório"],
      city: [v => !!v || "O campo é obrigatório"]
    }
  }),
  watch: {
    form: {
      handler() {
        this.sendData();
      },
      deep: true
    }
  },
  methods: {
    async getAddress(cep) {
      cep = cep.replace("-", "");
      if (cep.length !== 8) return;
      try {
        let response = await cepPromise(cep);
        for (let key in response) {
          const element = response[key];
          // must change based on api
          key = key == "cep" ? "cep" : key;
          key = key == "neighborhood" ? "district" : key;
          this.form[key] = this.form[key] == "" ? element : this.form[key];
        }
        this.sendData();
      } catch (e) {
        console.warn(e);
      }
    },
    formatCep(cep) {
      // this.form.cep = cep.replace(/[^0-9\x2D]/g, "");
      if (cep.length === 8 && !cep.includes("-")) {
        this.form.cep = `${cep.substr(0, 5)}-${cep.substr(5, 9)}`;
      }
    },
    sendData() {
      this.$emit("sendData", this.form);
    }
  }
};
</script>

<style scoped lang="css">
h1 {
  margin-bottom: 20px;
}
.form {
  width: 100%;
  /* display: grid;
  height: 100%;
  grid-template-columns: 75% 20%;
  grid-column-gap: 5%; */
}
</style>