import axios from "axios"

export async function getAssisteds() {
  try {
    const headers = { Authorization: localStorage.getItem("token") }
    let response = await axios.get(process.env.VUE_APP_API + "admin/assisted", headers);
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAssisted(id) {
  try {
    const headers = { Authorization: localStorage.getItem("token") }
    await axios.delete(process.env.VUE_APP_API + "admin/assisted/" + id, headers);
  } catch (error) {
    console.log(error)
  }
}