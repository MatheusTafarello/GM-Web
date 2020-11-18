<template>
  <div>
    <h1 class="headline">Informações Pessoais</h1>
    <v-form class="form" v-model="form.assistedValid">
      <v-text-field
        v-model="form.fullName"
        :rules="rules.fullname"
        label="Nome Completo"
        dense
        outlined
        validate-on-blur
      />
      <v-text-field
        v-model="form.password"
        :rules="rules.password"
        label="Senha"
        dense
        outlined
        validate-on-blur
      />
      <v-text-field
        v-model="form.cpf"
        label="CPF"
        :rules="rules.cpf"
        @input="formatCPF(form.cpf)"
        maxlength="11"
        dense
        outlined
      />
      <v-textarea
        height="100px"
        v-model="form.observation"
        :rules="rules.observation"
        label="Descrição do caso"
        dense
        outlined
      />
      <div style="display: flex; flex-direction: row; justify-content: space-between">
        <input
          style="display: none"
          ref="imgInput"
          type="file"
          accept="image/*"
          @change="loadFile"
        />
        <div class="imgContainer">
          <img v-if="imgUrl" class="img" :src="imgUrl" @click="$refs.imgInput.click()" />
          <v-tooltip v-else bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click="$refs.imgInput.click()">
                <v-icon large :color="imgError ? 'error' : 'primary'"
                  >mdi-file-image-outline</v-icon
                >
              </v-btn>
            </template>
            <span>Upload image</span>
          </v-tooltip>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: {
      assistedValid: false,
      fullName: '',
      password: '',
      cpf: '',
      observation: '',
      photograph: null,
    },
    rules: {
      fullname: [
        (v) => !!v || 'O campo é obrigatório',
        (v) => v.length < 255 || 'No máximo 255 caracteres',
        (v) => /^([^0-9]*)$/.test(v) || 'Digitos não são aceitos',
        // (v) => /^[-+=(),'.a-zA-Z0-9]+$/.test(v) || 'Caracteres especiais não são aceitos',
      ],
      cpf: [(v) => /^((\d{3}.\d{3}.\d{3}-\d{2}))$/.test(v) || 'CPF inválido!'],
      password: [
        (v) => !!v || 'O campo é obrigatório',
        (v) => !v.includes(' ') || 'Não pode conter espaços',
        (v) => v.length < 60 || 'No máximo 60 caracteres',
      ],
      phone: [(v) => !!v || 'O campo é obrigatório'],
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
</style>