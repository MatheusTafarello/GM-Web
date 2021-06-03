module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  //For CORS problem
  devServer: {
    proxy: 'http://localhost:4000/'
  }
}
