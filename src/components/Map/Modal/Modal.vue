<template>
  <v-dialog v-model="dialog" max-width="450" class="mapPopup">
    <v-card class="body elevation-5">
      <div class="text-center pt-5 pb-5">
        <Photograph :source="assisted.photograph" size="80px" />
        <div class="name font-weight-bold">{{ assisted.fullName }}</div>
        <div class="value">{{ address }}</div>
      </div>
      <div>
        <section class="author-camp">
          <v-btn @click="moveCarousel('left')" icon :disabled="atHeadOfList">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <div v-for="(item, id) in paginate" :key="id">
            <div class="text-center">
              <Photograph :source="item.photograph" size="80px" />
              <div class="name font-weight-bold">{{ item.fullName }}</div>
            </div>
            <div class="informations">
              <div class="value">Porte de arma:</div>
              <div class="value font-weight-bold pl-1">{{ item.hasGun ? 'Sim' : 'Não' }}</div>
            </div>
          </div>
          <v-btn v-if="atEndOfList" color="primary" @click="moveCarousel('right')" icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </section>
      </div>
      <v-form v-if="showForm" ref="form" class="pt-5">
        <v-text-field
          label="Número T.A"
          v-model="taNumber"
          dense
          :rules="rules.number"
          outlined
          hide-details
        ></v-text-field>
        <v-select
          v-model="employee"
          :items="employers"
          :item-text="'fullName'"
          :item-value="'id'"
          label="Policial"
          dense
          outlined
        ></v-select>
        <v-textarea
          v-if="actuation"
          v-model="observation"
          outlined
          label="Observação"
          readonly
          height="100"
        />
      </v-form>
      <v-alert v-if="actuation" dense text type="info" :color="status.color">
        {{ status.text }}
      </v-alert>
      <div class="text-center" v-if="showForm">
        <v-btn depressed color="success" @click="openCall">Abrir Chamado</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import { eventBus } from '@/main.js';
import { getMeasure } from '@/services/measure.js';
import { getUsers } from '@/services/user.js';
import { getAddress } from '@/services/map.js';
import { openActuationCall } from '@/services/actuation.js';
import Photograph from '@/common-components/Image/Photograph.vue';

export default {
  components: {
    Photograph,
  },
  data: () => ({
    actuation: null,
    assisted: {},
    authors: [],
    address: '',
    measurements: [],
    status: { color: 'danger', text: 'Em pânico!' },
    dialog: false,
    employers: [],
    employee: '',
    observation: '-',
    taNumber: '',
    currentPage: 1,
    itemsPerPage: 1,
    totalPages: 0,
    rules: {
      number: [
        (v) => !!v || 'O campo é obrigatório',
        (v) => !isNaN(parseInt(v)) || 'Deve ser um número inteiro',
      ],
    },
  }),

  created() {
    eventBus.$on('assisted-clicked', this.getMeasures);
    this.initialize();
  },
  watch: {
    dialog: {
      handler() {
        this.getMeasures();
        if (!this.dialog) {
          this.resetModal();
        }
      },
    },
    authors:{
      handler(){
        this.calculate();
      }
    }
  },
  computed: {
    paginate() {
      let index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.authors.slice(index, index + this.itemsPerPage);
    },
    atEndOfList() {
      return this.currentPage !== this.totalPages;
    },
    atHeadOfList() {
      return this.currentPage === 1;
    },
    showForm() {
      if (this.actuation) {
        return this.actuation.stateId == 1;
      }
      return false;
    },
  },
  methods: {
    async initialize() {
      this.employers = await getUsers(3);
    },

    async getMeasures(assisted) {
      if (!assisted) return;
      if (assisted.actuation) {
        this.actuation = assisted.actuation;
        this.actuationStatus();
      }
      let { lat, lng } = assisted;
      this.address = await getAddress({ latitude: lat, longitude: lng });
      this.measurements = await getMeasure(assisted.id);
      if (this.measurements.length) {
        this.setAssisted();
        this.setAuthor();
        this.dialog = true;
      }
    },

    async openCall() {
      if (this.$refs.form.validate()) {
        let obj = {
          actuationId: this.actuation.id,
          employeeId: this.employee,
          observation: this.observation,
          taNumber: parseInt(this.taNumber),
        };
        let response = await openActuationCall(obj);
        if (response) {
          eventBus.$emit('update-historic');
          eventBus.$emit('update-map', obj.actuationId);
          this.clearForm();
          this.dialog = false;
        }
      }
    },

    setAssisted() {
      let assisted = {};
      this.measurements.forEach((val) => {
        assisted = val.assisted;
      });
      this.assisted = assisted;
      this.observation = assisted.observation ? assisted.observation : 'Sem descrição';
    },

    setAuthor() {
      let authors = [];
      this.measurements.forEach((val) => {
        authors.push(val.author);
      });
      this.authors = authors;
    },

    actuationStatus() {
      let state = this.actuation ? this.actuation.stateId : 0;
      switch (state) {
        case 1:
          this.status = { color: 'danger', text: 'Em pânico!' };
          break;
        case 2:
          this.status = { color: 'yellow darken-3', text: 'Em progresso' };
          break;
      }
    },

    calculate() {
      this.totalPages = Math.ceil(this.authors.length / this.itemsPerPage);
    },

    moveCarousel(direction) {
      if (direction === 'left' && this.currentPage !== 1) {
        this.currentPage -= 1;
      } else if (direction === 'right' && this.currentPage !== this.totalPages) {
        this.currentPage += 1;
      }
    },
    clearForm() {
      this.$refs.form.resetValidation();
      this.employee = {};
      this.observation = '-';
      this.taNumber = '';
    },
    resetModal() {
      this.actuation = null;
      this.assisted = {};
      this.authors = [];
      this.address = '';
      this.measurements = [];
    },
  },
};
</script>
<style scoped>
.name {
  color: #4f4f4f;
}
.value {
  color: #828282;
}

.v-select {
  margin-top: 25px;
}
.informations {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.author-camp {
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 0.1fr 1fr 0.1fr;
}
.card-comment {
  margin-bottom: 10px;
}
.body {
  padding: 12px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.body::-webkit-scrollbar-track {
  background-color: transparent !important;
}
.body::-webkit-scrollbar {
  width: 5px;
}
.body::-webkit-scrollbar-thumb {
  background-color: #bdbdbd81;
}

.mapPopup {
  z-index: 3;
}
</style>
