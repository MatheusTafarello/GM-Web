import axios from "axios"

export async function getLocalization() {
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") }
    }
    let response = await axios.get(process.env.VUE_APP_API + "admin/localization", config);
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}


export async function getAddress({ latitude, longitude }) {
  let latlng = `${latitude},${longitude}`;
  try {
    const config = {
      params: {
        latlng,
        key: process.env.VUE_APP_KEY
      }
    }
    let response = await axios.get(process.env.VUE_APP_GEOCODING_API, config)
    if (response.data.error_message) {
      console.error(response.data.error_message);
      return "-"
    }
    return response.data.results[0].formatted_address;
  } catch (error) {
    return Promise.reject(error);
  }
}