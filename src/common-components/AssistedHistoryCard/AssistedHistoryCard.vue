<template>
  <div class="containerCard elevation-2">
    <Popup :dialog="openDialog" @confirm="closeCall" @cancel="openDialog = false" :type="type" />
    <div class="card">
      <div class="image">
        <img
          v-if="this.assistedInformation.photograph"
          :src="require(`@/../../GM-API/src/uploads/${this.assistedInformation.photograph}`)"
          :alt="this.assistedInformation.photograph"
          :height="60"
          :width="60"
          class="assisted-photograph"
        />
      </div>
      <div class="name">{{ assistedInformation.fullName }}</div>
      <div class="address">
        <div v-if="address.length < 30">{{ address }}</div>
        <div v-else>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                {{ address.split(',', 3)[0] }}
              </span>
            </template>
            <span>{{ address }}</span>
          </v-tooltip>
        </div>
      </div>
      <div class="status">
        <span class="statusText">{{ statusText }}</span>
      </div>
      <div class="button">
        <v-tooltip bottom color="dark">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="openPopup(assisted)" icon small>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <span>Encerrar chamado</span>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main.js';
import { getOne } from '@/services/assisted.js';
import { getAddress } from '@/services/map.js';
import Popup from '@/common-components/Popup/Popup.vue';
import { closeActuation } from '@/services/actuation.js';

export default {
  name: 'AssistedHistoryCard',
  components: {
    Popup,
  },

  props: {
    assisted: {
      type: Object,
    },
    assistedsLocation: {
      type: Array,
    },
  },

  data: () => ({
    dados: {},
    assistedInformation: [],
    address: '',
    openDialog: false,
    type: 'delete',
    selectedCard: {},
  }),
  watch: {
    assisted: {
      immediate: true,
      handler() {
        this.setComponent(this.assisted);
      },
    },
  },

  methods: {
    async setComponent(assisted) {
      await this.getOneAssisted(assisted.assistedId);
      await this.getFullAddress(assisted.latitude, assisted.longitude);
    },

    async getOneAssisted(id) {
      this.assistedInformation = await getOne(id);
    },

    async getFullAddress(latitude, longitude) {
      this.address = await getAddress({ latitude, longitude });
    },

    async closeCall() {
      await closeActuation({
        actuationId: this.selectedCard.actuation.id,
        locationId: this.selectedCard.id,
      });
      this.$emit('closedActuation');
      eventBus.$emit('closed-actuation', this.selectedCard.actuation.id);
      this.openDialog = false;
    },
    openPopup(assisted) {
      this.selectedCard = assisted;
      this.openDialog = true;
    },
  },

  computed: {
    statusClass() {
      switch (this.assisted.actuation.id) {
        case 1:
          return 'inProgress';
        case 2:
          return 'inPanic';
        default:
          return 'closed';
      }
    },

    statusText() {
      switch (this.assisted.actuation.id) {
        case 1:
          return 'Em Progresso';
        case 2:
          return 'Em Pânico';
        default:
          return 'Chamado Fechado';
      }
    },

    alertColor() {
      switch (this.assisted.actuation.id) {
        case 1:
          return 'inProgressAlert';
        case 2:
          return 'inPanicAlert';
        default:
          return 'closedAlert';
      }
    },
  },
};
</script>

<style scoped>
.containerCard {
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  width: 90%;
  height: 15%;
}
.card {
  display: grid;
  justify-content: space-between;
  padding: 5px;
  width: 100%;
  height: 80px;
  grid-template-columns: 1fr 2fr 0.3fr;
  grid-template-areas:
    'image name name'
    'image address close'
    'image content content';

  align-items: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.image {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: image;
  /* padding-left: 5px; */
}
.assisted {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: gray;
  align-self: center;
}
.name {
  grid-area: name;
  font-size: 16px;
  font-weight: bold;
}

.status {
  font-size: 12px;
  grid-area: content;
  color: #ff9e58;
}

.button {
  grid-area: close;
  align-self: center;
}
.address {
  grid-area: address;
  font-size: 12px;
}

.assisted-photograph {
  border-radius: 50%;
}
</style>