import axios from "axios";

export async function openActuationCall(data) {
  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
    let response = await axios.post(process.env.VUE_APP_API + "admin/actuation", data, config)
    return response;
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function closeActuation({ actuationId, locationId }) {
  try {
    const data = {
      actuationId,
      locationId
    }
    const config = {
      headers: { Authorization: localStorage.getItem("token") }
    }
    let response = await axios.post(process.env.VUE_APP_API + "admin/actuation/close/", data, config);
    return response;
  } catch (error) {
    return Promise.reject(error)
  }
}