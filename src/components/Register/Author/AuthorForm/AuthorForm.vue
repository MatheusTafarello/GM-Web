<template>
  <div>
    <h1 class="headline">Informações Pessoais</h1>
    <v-form class="form" v-model="form.authorValid">
      <v-text-field
        v-model="form.fullName"
        label="Nome Completo"
        :rules="rules.fullName"
        dense
        outlined
        validate-on-blur
        @input="sendData()"
      />
      <v-text-field
        v-model="form.cpf"
        label="CPF"
        :rules="rules.cpf"
        maxlength="11"
        dense
        outlined
        @input="formatCPF(form.cpf), sendData()"
      />
      <v-textarea
        v-model="form.observation"
        label="Observação"
        :rules="rules.observation"
        height="100px"
        id="textarea"
        dense
        outlined
        @input="sendData()"
      />

      <div style="display: flex; align-items: center">
        <v-text-field
          v-model="form.dvc"
          label="DVC"
          :rules="rules.dvc"
          dense
          outlined
          @input="sendData()"
        />
        <v-checkbox
          v-model="form.hasGun"
          label="Porte de arma?"
          style="margin: 0px 15px; padding: 0"
          true-value="true"
          false-value="false"
          @input="sendData()"
        />
      </div>
      <input style="display: none" ref="imgInput" type="file" accept="image/*" @change="loadFile" />
      <div class="imgContainer">
        <img v-if="imgUrl" class="img" :src="imgUrl" @click="$refs.imgInput.click()" />
        <v-tooltip v-else bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="$refs.imgInput.click()">
              <v-icon large :color="imgError ? 'error' : 'primary'">mdi-file-image-outline</v-icon>
            </v-btn>
          </template>
          <span>Enviar imagem</span>
        </v-tooltip>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  props:{
    author:{
      type: Object,
    },
  },
  mounted: async function(){
    this.form = this.author;
  },

  data: () => ({
    form: {
      authorValid: false,
      fullName: '',
      cpf: '',
      observation: '',
      dvc: '',
      hasGun: false,
      image: null,
    },
    rules: {
      fullName: [
        (v) => !!v || 'O campo é obrigatório',
        (v) => v.length < 255 || 'No máximo 255 caracteres',
        (v) => /^([^0-9]*)$/.test(v) || 'Digitos não são aceitos',
        // (v) => /^[-+=(),'.a-zA-Z0-9]+$/.test(v) || 'Caracteres especiais não são aceitos',
      ],
      cpf: [(v) => /^((\d{3}.\d{3}.\d{3}-\d{2}))$/.test(v) || 'CPF inválido!'],
      dvc: [
        (v) => !!v || 'O campo é obrigatório',
        (v) => v.length < 60 || 'No máximo 60 caracteres',
      ],
      image: [
        (v) => !!v || 'Imagem obrigatoria',
        (v) => (v && v.length > 0) || 'Imagem obrigatória',
      ],
      observation: [
        (v) => !!v || 'O campo é obrigatório',
        (v) => v.length < 300 || 'No máximo 300 caracteres',
      ],
    },

    imgUrl: null,
    imgError: false,
  }),
  watch: {
    form: {
      handler() {
        if (this.imgUrl) {
          this.sendData();
        }
      },
      deep: true,
    },
  },
  methods: {
    sendData() {
      this.$emit('sendData', this.form);
    },
    loadFile(e) {
      if (e.target.files[0]) {
        this.form.image = e.target.files[0];
        this.imgUrl = URL.createObjectURL(e.target.files[0]);
        this.sendData();
      } else {
        this.imgError = true;
      }
    },
    formatCPF(cpf) {
      if (cpf.length === 11 && !cpf.includes('.')) {
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        this.form.cpf = cpf;
      }
    },
  },
};
</script>

<style scoped lang="css">
h1 {
  margin-bottom: 20px;
}
.form {
  width: 100%;
}

.imgContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 140px;
  height: 140px;
  border: solid 1px rgba(0, 0, 0, 0.38);
  border-radius: 5px;
  padding: 10px;
}

.img {
  cursor: pointer;
  width: 120px;
  height: 120px;
  border-radius: 5px;
}

#textarea{
  resize: none;
}
</style>