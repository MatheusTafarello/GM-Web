<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card class="popup">
      <v-card-text class="text-center display-1 black--text">Tem certeza?</v-card-text>
      <br />
      <v-card-actions class="justify-space-around">
        <v-btn @click="$emit('cancel')">Cancelar</v-btn>
        <v-btn @click="$emit('confirm')">sim</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
    },
  },
  data: () => ({
    popup: false,
  }),
};
</script>

<style scoped>
.popup {
  padding: 15px;
}
.buttons {
  display: flex;
}
</style>