<template>
  <div class="">
    <v-form class="measure-form">
      <div class="select">
        <v-select
          v-model="form.assistedId"
          :items="assisteds"
          :item-text="'fullName'"
          :item-value="'id'"
          label="Selecione uma assistida"
          outlined
          @change="sendData"
        />
      </div>
      <div class="select">
        <v-select
          v-model="form.authorId"
          :items="authors"
          :item-text="'fullName'"
          :item-value="'id'"
          label="Selecione um autor"
          outlined
          @change="sendData"
        />
      </div>
      <div class="select">
        <v-menu :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.validity"
              label="Validade da Medida"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              outlined
            />
          </template>
          <v-date-picker
            v-model="form.validity"
            locale="pt-br"
            :min="new Date().toISOString().substr(0, 10)"
            @change="sendData"
          />
        </v-menu>
      </div>
    </v-form>
  </div>
</template>
<script>
import { getAssisteds } from '@/services/assisted.js';
import { getAuthors } from '@/services/author.js';

export default {
  data() {
    return {
      authors: [],
      assisteds: [],
      form: {
        assistedId: null,
        authorId: null,
        validity: null,
      },
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.assisteds = await getAssisteds();
      this.authors = await getAuthors();
    },
    sendData() {
      this.$emit('sendData', this.form);
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
.form {
  width: 100%;
}
.measure-form {
  padding: 0 10%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 100px 100px;
}

.select {
  width: 80%;
  margin: auto;
}
</style>