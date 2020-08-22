<template>
  <div class="controlCard">
    <div class="card">
      <div class="containerImg">
        <img width="90px" height="100px" :src="picture" />
      </div>
      <div class="textDivCard">
        <p class="textCard">{{ title }}</p>
      </div>
      <div class="buttonControl">
        <router-link :to="route">
          <button>
            <span>Ver</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",

  props: {
    title: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true
    },
    route: {
      type: String
      /* required: true, */
    }
  },

  data: () => ({
    dados: {}
  })
};
</script>

<style lang="scss" scoped>
/* body style */

body {
  background: #f5f7fb;
}

/* card styles */

.card {
  justify-content: center;
  position: relative;
  width: 350px;
  height: 380px;
  border-radius: 10px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
}

.controlCard {
  display: flex;
  justify-content: center;
}

.containerImg {
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  width: 130px;
  margin: 50px 50px;
  border-radius: 10px;
  background: rgba(35, 82, 124, 0.1);
}

.textCard {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 29px;
  color: #23527c;
  margin-left: 50px;
}

.textDivCard {
  position: absolute;
  top: 195px;
}

.buttonControl {
  display: flex;
  justify-content: center;
  padding-top: 65px;
}

.container button {
  width: 210px;
  height: 45px;
  border: 2px solid #23527c;
  border-radius: 5px;
  background: #ffff;
}

.container button span {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 29px;
  text-align: center;

  color: #23527c;
}

/* card style hover */

.card:hover {
  background: #386288;
  & .textCard {
    color: white;
  }
  & button {
    background: #386288;
    border: 2px solid white;
  }
  & span {
    color: white;
  }
  & .containerImg {
    background: #23527c;
  }
}
</style>
