<template>
  <div class="mainContainer">
    <div
      class="containerHistory"
      v-for="(assisted, i) in assisteds"
      :key="`${i}-${assisted.assistedName}`"
    >
      <AssistedHistoryCard :assisted="assisted" />
    </div>
  </div>
</template>

<script>
import AssistedHistoryCard from '@/common-components/AssistedHistoryCard/AssistedHistoryCard';
export default {
  name: 'History',
  components: {
    AssistedHistoryCard,
  },

  props: {},

  data: () => ({
    assisteds: [
      { assistedName: 'Joanda', activationTime: '14:12', status: 1 },
      { assistedName: 'Joanda', activationTime: '14:12', status: 2 },
      { assistedName: 'Joanda', activationTime: '14:12', status: 3 },
      { assistedName: 'Joanda', activationTime: '14:12', status: 3 },
      { assistedName: 'Joanda', activationTime: '14:12', status: 3 },
      { assistedName: 'Joanda', activationTime: '14:12', status: 3 },
      { assistedName: 'Joanda', activationTime: '14:12', status: 3 },
      { assistedName: 'Joanda', activationTime: '14:12', status: 3 },
      { assistedName: 'Joanda', activationTime: '14:12', status: 3 },
      { assistedName: 'Joanda', activationTime: '14:12', status: 3 },
      { assistedName: 'Joanda', activationTime: '14:12', status: 3 },
      { assistedName: 'Joanda', activationTime: '14:12', status: 3 },
      { assistedName: 'Joanda', activationTime: '14:12', status: 3 },
      { assistedName: 'Joanda', activationTime: '14:12', status: 3 },
    ],
    dados: {},
  }),
};
</script>

<style lang="scss" scoped>
.mainContainer {
  max-height: 80.5vh;

  overflow: scroll;
  overflow-x: hidden;
  margin-top: 10px;
}

.containerHistory {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
}
</style>
