module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  //For CORS problem
  devServer: {
    proxy: 'http://e6daffd5c9dc.ngrok.io/'
    // proxy: 'http://localhost:4000/'
  }
}