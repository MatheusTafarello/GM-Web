import axios from "axios"

export async function getAuthors() {
  try {
    const headers = { Authorization: localStorage.getItem("token") }
    let response = await axios.get(process.env.VUE_APP_API + "admin/author", headers);
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function deleteAuthor(id) {
  try {
    const headers = { Authorization: localStorage.getItem("token") }
    await axios.delete(process.env.VUE_APP_API + "admin/author/" + id, headers);
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function registerAuthor(payload){
  try{
    const headers = { 
      'Authorization': localStorage.getItem("token"),
      'Content-Type': 'multipart/form-data'
    }
    let response = await axios.post(process.env.VUE_APP_API + "admin/author/", payload, headers);
    console.log(response);
  }
  catch(error){
    console.log(error);
  }
}