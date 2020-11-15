<template>
  <div class="home">
    <div v-for="info in cardInfo" :key="info.title">
      <Card :title="info.title" :picture="info.picture" :route="info.url" />
    </div>
  </div>
</template>

<script>
import assistedIcon from '@/assets/assistedIcon.png';
import mapIcon from '@/assets/mapIcon.png';

import Card from '../Card/Card.vue';

export default {
  name: 'Dashboard',
  components: {
    Card,
  },

  data: () => ({
    cardInfo: [
      {
        title: 'Assistida',
        picture: assistedIcon,
        url: 'manage_assisteds',
      },
      {
        title: 'Localização',
        picture: mapIcon,
        url: 'map',
      },
    ],
  }),
};
</script>

<style scoped>
.home {
  display: grid;
  /* grid-template-columns: repeat(2, 25%); */
  grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
  justify-content: center;
  gap: 40px;
  margin-top: 100px;
}
</style>
