<template>
  <div class="mainContainer">
    <div
      class="containerHistory"
      v-for="(assisted, i) in assistedsLocation"
      :key="`${i}-${assisted.id}`"
    >
      <AssistedHistoryCard :assisted="assisted" @closedActuation="initialize()" />
    </div>
    <div class="message" v-if="assistedsLocation.length == 0">
      <p class="grey--text">Sem chamados em progresso</p>
    </div>
  </div>
</template>

<script>
import AssistedHistoryCard from '@/common-components/AssistedHistoryCard/AssistedHistoryCard';
import { getLocalization } from '@/services/map.js';
import { eventBus } from '@/main.js';

export default {
  name: 'History',
  components: {
    AssistedHistoryCard,
  },
  data: () => ({
    assistedsLocation: [],
    interval: null,
    time: 20000,
  }),
  created() {
    eventBus.$on('update-historic', this.initialize);
    this.initialize();
    // this.interval = setInterval(async () => {
    //   await this.initialize();
    // }, this.time);
  },
  methods: {
    async initialize() {
      let assisteds = await getLocalization();
      this.assistedsLocation = assisteds.filter((value) => {
        if (value.actuation) {
          return value.actuation.stateId == 2;
        }
        return false;
      });
    },
  },
  beforeDestroy() {
    eventBus.$off('update-historic');
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss" scoped>
.mainContainer {
  max-height: 80.5vh;
  margin-top: 10px;
}

.containerHistory {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
}
.message {
  margin: auto;
  text-align: center;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f5f5f7;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #99989d;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #d9d9d9;
}
</style>