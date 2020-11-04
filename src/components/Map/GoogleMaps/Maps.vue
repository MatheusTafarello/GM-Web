<template>
  <div>
    <div style="height: 200px overflow: auto; z-index: 1">
      <l-map :center="center" :zoom="13" style="width: 100%; height: 78vh; z-index: 1">
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker
          :key="index"
          v-for="(m, index) in markers"
          :lat-lng="m.position"
          :icon="m.icon"
          @click="sendAssistedData(index)"
        >
          <!-- <l-popup>
          </l-popup> -->
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main.js';
import { getLocalization } from '@/services/map.js';
import { getOne } from '@/services/assisted.js';
import { latLng, icon } from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import inactiveAssisted from '@/assets/inactiveAssisted.svg';
import activeAssisted from '@/assets/activeAssisted.svg';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'MainMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: latLng(-23.183, -46.881),
      inactiveIcon: icon({
        iconUrl: inactiveAssisted,
        iconSize: [32, 37],
        iconAnchor: [16, 37],
      }),
      activeIcon: icon({
        iconUrl: activeAssisted,
        iconSize: [45, 47],
        iconAnchor: [16, 37],
      }),
      markers: [],
      interval: null,
    };
  },

  mounted() {
    this.geolocate();
  },

  async created() {
    this.getCurrentPositions();
    this.interval = setInterval(() => {
      this.getCurrentPositions();
    }, 15 * 1000);
  },

  methods: {
    sendAssistedData(index) {
      eventBus.$emit('assisted-clicked', this.markers[index].info);
    },
    async getCurrentPositions() {
      let data = await getLocalization();
      for (let i = 0; i < data.length; i++) {
        let assistedInfo = await getOne(data[i].assistedId);
        if (this.checkMarker(data[i])) {
          this.markers.push({
            position: [parseFloat(data[i].latitude), parseFloat(data[i].longitude)],
            info: {
              id: data[i].assistedId,
              nome: assistedInfo.fullName,
              cpf: assistedInfo.cpf,
              lat: parseFloat(data[i].latitude),
              lng: parseFloat(data[i].longitude),
              actuation: data[i].actuation,
            },
            id: data[i].assistedId,
            icon: data[i].actuation !== null ? this.activeIcon : this.inactiveIcon,
          });
          if (data[i].actuation !== null) {
            this.center = latLng(parseFloat(data[i].longitude), parseFloat(data[i].latitude));
          }
        }
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = latLng(position.coords.latitude, position.coords.longitude);
      });
    },
    checkMarker(marker) {
      for (let index = 0; index < this.markers.length; index++) {
        if (this.markers[index].id === marker.assistedId) {
          return false;
        }
      }
      return true;
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
</style>