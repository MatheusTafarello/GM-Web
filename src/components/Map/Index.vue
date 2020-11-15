<template>
  <div class="map-container">
    <div class="map-title pl-5">
      <h2 class="display-1">Monitoramento de Assistidas</h2>
    </div>
    <div class="historic-title">
      <h2 class="display-1">Chamados</h2>
    </div>
    <div class="map">
      <Maps />
    </div>
    <div class="historic">
      <History />
    </div>
    <Modal />
  </div>
</template>

<script>
import History from './History/History';
import Maps from './GoogleMaps/Maps';
import Modal from './Modal/Modal';

export default {
  components: {
    Maps,
    Modal,
    History,
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 80%;
  display: grid;
  grid-template: 8% 90% / 75% 25%;
  grid-area: 'map-title historic-title' 'map historic';
}

.map-title {
  display: flex;
  align-items: center;
  grid: map-title;
}
.historic-title {
  display: flex;
  justify-content: center;
  align-items: center;
  grid: historic-title;
}

.map {
  grid: map;
  padding: 12px;
}

.historic {
  grid: historic;
}
</style>
