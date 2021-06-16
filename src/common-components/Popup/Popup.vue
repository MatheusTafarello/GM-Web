<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card class="popup">
      <div class="icon">
        <v-icon :color="color()" size="70px">{{ icon() }}</v-icon>
      </div>
      <v-card-text class="headline text-center black--text">{{ title() }}</v-card-text>
      <v-spacer />
      <v-card-actions v-if="type == 'delete'">
        <v-btn text color="grey lighten" @click="$emit('cancel')">Cancelar</v-btn>
        <v-spacer />
        <v-btn outlined color="primary" @click="$emit('confirm')">Sim</v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <div id="button">
          <v-btn color="primary" onclick="javascript:history.back()">Ok</v-btn>
        </div>
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
    type: {
      type: String,
      default: "Confirm"
    },
  },
  data: () => ({
    popup: false,
  }),
  methods: {
    title() {
      switch (this.type) {
        case 'delete':
          return 'Tem certeza?';
        case 'success':
          return 'Sucesso!';
        case 'error':
          return 'Erro';
        case 'editAuthor':
          return 'Autor editado com sucesso!';
        case 'editAssisted':
          return 'Assistida editada com sucesso!';
          // this.$router.push('../components/Table/Assisted/manage_assisteds.vue');
        case 'editUser':
          return 'Usuário editado com sucesso!';
        default:
          return 'Confirmado';
      }
    },
    color() {
      switch (this.type) {
        case 'delete':
          return '#ff5858';
        case 'success':
          return '#64bb4e';
        case 'error':
          return '#ff5858';
        default: 
          return '#64bb4e';
      }
    },
    icon() {
      switch (this.type) {
        case 'delete':
          return 'mdi-alert';
        case 'success':
          return 'mdi-check-circle';
        case 'error':
          return 'mdi-close-circle';
        default:
          return 'mdi-check-circle';
      }
    },
  },
};
</script>

<style scoped>
.popup {
  padding: 15px;
}
.icon {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
