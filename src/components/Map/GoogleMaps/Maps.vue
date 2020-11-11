<template>
  <div>
    <div style="height: 200px overflow: auto; z-index: 1">
      <l-map :center="center" :zoom="13" style="width: 100%; height: 78vh; z-index: 1">
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker
          :key="index"
          v-for="(m, index) in mapMarkers"
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
import { latLng, icon } from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import inactiveAssisted from '@/assets/inactiveAssisted.svg';
import activeAssisted from '@/assets/activeAssisted.svg';
import openCallAssisted from '@/assets/openCallAssisted.svg';
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
      openCallIcon: icon({
        iconUrl: openCallAssisted,
        iconSize: [45, 47],
        iconAnchor: [16, 37],
      }),
      markers: [],
      interval: null,
      intervalTime: 5000,
      update: false,
    };
  },

  mounted() {
    this.geolocate();
  },

  async created() {
    eventBus.$on('update-map', this.updateIcon);
    eventBus.$on('closed-actuation', this.updateMarkers);
    this.getCurrentPositions();
    this.interval = setInterval(() => {
      this.getCurrentPositions();
    }, this.intervalTime);
  },

  computed: {
    mapMarkers() {
      this.update;
      return this.markers;
    },
  },

  methods: {
    sendAssistedData(index) {
      let payload = this.markers[index].info;
      eventBus.$emit('assisted-clicked', payload);
    },
    async getCurrentPositions() {
      let data = await getLocalization();
      for (let i = 0; i < data.length; i++) {
        let assistedInfo = data[i].assisted;
        if (this.checkMarker(data[i])) {
          this.markers.push({
            position: [parseFloat(data[i].latitude), parseFloat(data[i].longitude)],
            info: {
              id: data[i].assistedId,
              nome: assistedInfo.fullName,
              lat: parseFloat(data[i].latitude),
              lng: parseFloat(data[i].longitude),
              actuation: data[i].actuation,
            },
            id: data[i].assistedId,
            icon: this.getCorrectIcon(data[i]),
          });
        } else {
          for (let index = 0; index < this.markers.length; index++) {
            if (this.markers[index].id === data[index].assistedId) {
              this.markers[index] = {
                position: [parseFloat(data[index].latitude), parseFloat(data[index].longitude)],
                info: {
                  id: data[index].assistedId,
                  nome: assistedInfo.fullName,
                  lat: parseFloat(data[index].latitude),
                  lng: parseFloat(data[index].longitude),
                  actuation: data[index].actuation,
                },
                id: data[index].assistedId,
                icon: this.getCorrectIcon(data[index]),
              };
            }
          }
          this.update = !this.update;
        }
      }
    },
    getCorrectIcon(payload) {
      if (payload.actuation !== null) {
        return payload.actuation.stateId === 1 ? this.activeIcon : this.openCallIcon;
      } else return this.inactiveIcon;
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
    updateIcon(id) {
      for (let index = 0; index < this.markers.length; index++) {
        if (this.markers[index].info.actuation && id === this.markers[index].info.actuation.id) {
          this.markers[index].icon = this.openCallIcon;
        }
      }
      this.update = !this.update;
    },
    updateMarkers(id) {
      for (let index = 0; index < this.markers.length; index++) {
        if (this.markers[index].info.actuation && id === this.markers[index].info.actuation.id) {
          this.markers[index].icon = this.inactiveIcon;
        }
      }
      this.update = !this.update;
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
</style>