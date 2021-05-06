<template>
  <div class="containerCard elevation-2">
    <Popup :dialog="openDialog" @confirm="closeCall" @cancel="openDialog = false" :type="type" />
    <div class="card">
      <div class="image" @click="openModal(assisted)">
        <Picture
          v-if="this.assistedInformation"
          :itemId="assisted.id"
          :config="{ height: '60px', width: '60px', borderRadius: '50%' }"
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
        <span class="statusText">Chamado em Progresso</span>
      </div>
      <div class="button">
        <v-tooltip bottom color="dark">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="openPopupItem(assisted)" icon small>
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
import Picture from '@/common-components/Image/Picture.vue';

export default {
  name: 'AssistedHistoryCard',
  components: {
    Popup,
    Picture,
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
    openModal(actuation) {
      const { assistedId, assisted, latitude, longitude } = actuation;
      const obj = {
        lat: latitude,
        lng: longitude,
        id: assistedId,
        nome: assisted.name,
      };
      eventBus.$emit('assisted-clicked', obj);
    },
  },

  computed: {
    statusText() {
      let state = this.assisted.actuation ? this.assisted.actuation.stateId : 0;
      switch (state) {
        case 1:
          return 'Em Pânico';
        default:
          return 'Chamado em Progresso';
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
  margin-top: 4px;
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
  cursor: pointer;
}
</style>