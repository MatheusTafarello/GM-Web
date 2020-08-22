<template>
  <v-menu bottom offset-y dense close-on-click>
    <template v-slot:activator="{ on }">
      <v-btn dark v-on="on" text class="text-normal">
        <v-icon :color="asset.color" left v-text="asset.icon" />
        <slot></slot>
        <v-icon :color="asset.arrowColor" v-text="'mdi-menu-down'" />
      </v-btn>
    </template>
    <v-list nav dense>
      <v-list-item-group color="green">
        <v-list-item v-for="(item, index) in menuItems" :key="index" :to="item.route">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "accent"
    },
    arrowColor: {
      type: String,
      default: "accent"
    },
    icon: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    asset: {},
    menuItems: []
  }),
  mounted() {
    const icon = this.icon;
    const color = this.color;
    const arrowColor = this.arrowColor;
    this.asset = { icon, color, arrowColor };
    this.menuItems = [...this.items];
  }
};
</script>

<style scoped>
* {
  text-transform: none !important;
}
</style>