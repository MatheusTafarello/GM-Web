<template>
  <div class="containerCard elevation-2">
    <div class="card">
      <div class="informations">
        <span class="textAssisted">{{ assisted.assistedName }}</span>
        <span class="text">{{ assisted.activationTime }}</span>
      </div>
      <div class="assistedPhoto"></div>
    </div>
    <div :class="['status', statusClass]">
      <span class="statusText">{{ statusText }}</span>
      <div class="iconAlert">
        <v-icon :class="['alert', alertColor]" v-text="'mdi-alert-circle'" size="17px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssistedHistoryCard',

  props: {
    assisted: {
      type: Object,
    },
  },

  data: () => ({
    dados: {},
  }),

  watch: {
    assisted: {
      handler() {
        console.log(this.assisted);
      },
    },
  },

  methods: {},

  computed: {
    statusClass() {
      switch (this.assisted.status) {
        case 1:
          return 'inProgress';
        case 2:
          return 'inPanic';
        default:
          return 'closed';
      }
    },

    statusText() {
      switch (this.assisted.status) {
        case 1:
          return 'Em Progresso';
        case 2:
          return 'Em Pânico';
        default:
          return 'Chamado Fechado';
      }
    },

    alertColor() {
      switch (this.assisted.status) {
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

<style lang="scss" scoped>
.containerCard {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  height: 15%;
}

.containerCard .ghost {
  position: absolute;
  background: coral;
}

.containerCard .text {
  font-size: 12px;
}

.containerCard .textAssisted {
  font-size: 15px;
  font-weight: bold;
}

.containerCard .card {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  align-items: center;
  width: 100%;
}

.card .informations {
  display: flex;
  flex-direction: column;
}

.containerCard .status {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  border-radius: 3px;
  margin: 20px 0px 10px 0px;
  font-size: 12px;
}

.containerCard .status .statusText {
  width: 100%;
  font-weight: bold;
  text-align: left;
  margin-left: 5px;
}

.assistedPhoto {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dadada;
  margin-left: 20px;
  height: 50px;
  width: 50px;
  border-radius: 10px;
}

.alert {
  margin-right: 5px;
  margin-bottom: 1px;
}

.iconAlert {
  display: flex;
  align-items: center;
  justify-content: center;
}
.inProgress {
  background: #ff9e5871;
  color: #ff9e58;
}

.inPanic {
  background: #ff000073;
  color: #db2d2d;
}

.closed {
  background: #2d9bdb5d;
  color: #2d9cdb;
}

.inProgressAlert {
  color: #ff9e58;
}

.inPanicAlert {
  color: #db2d2d;
}

.closedAlert {
  color: #2d9cdb;
}
</style>
