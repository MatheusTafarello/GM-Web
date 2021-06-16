module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  //For CORS problem
  devServer: {
    proxy: 'https://1d2f29a93237.ngrok.io/'
    // proxy: 'http://localhost:4000/'
    // VUE_APP_API="http://localhost:4000/"
  }
}
