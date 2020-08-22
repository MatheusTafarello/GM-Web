<template>
  <div class="content">
    <div>
      <h2 class="display-1">{{title}}{{subTitle}}</h2>
    </div>
    <div>
      <v-divider></v-divider>
    </div>
    <div class="routes-bar">
      <div v-for="(item, index) in list" :key="index" class="item">
        <div v-if="index+1 != list.length ">
          <a @click="goTo(item.route)">{{item.name}}</a>
        </div>
        <div v-else>
          <h2>{{item.name}}</h2>
        </div>
        <v-divider vertical v-show="index+1 != list.length "></v-divider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      default: () => [
        { name: "Pagina Inicial", route: "home" },
        { name: "Autor", route: "register_author" }
      ]
    }
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style scoped lang="css">
.content {
  display: grid;
  grid-template: auto 20px 45px / 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.display-1{
  margin: 0 0 20px 30px;
}

.routes-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  background-color: #F5F5F5;
  border-radius: 5px;
  padding: 0 15px;
  margin-top: 25px;
}

.item {
  display: grid;
  grid-template: 100% / auto 10px;
}

.item div {
  margin-right: 10px;
}
h2 {
  font-size: 16px;
  font-weight: 500;
}
</style>