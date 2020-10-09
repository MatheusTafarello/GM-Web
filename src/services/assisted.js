import axios from "axios"

export async function getAssisteds() {
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") }
    }
    let response = await axios.get(process.env.VUE_APP_API + "admin/assisted", config);
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function deleteAssisted(id) {
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") }
    }
    await axios.delete(process.env.VUE_APP_API + "admin/assisted/" + id, config);
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function registerAssisted(payload) {
  try {
    const config = {
      headers: {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post(process.env.VUE_APP_API + "admin/assisted/", payload, config);
  } catch (error) {
    return Promise.reject(error)
  }
}