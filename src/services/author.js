import axios from "axios"

export async function getAuthors() {
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") }
    }
    let response = await axios.get(process.env.VUE_APP_API + "admin/author", config);
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getAuthor(id) {
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") }
    }
    let response = await axios.get(process.env.VUE_APP_API + "admin/author/" + id, config);
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getAuthorPicture(id) {
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") }
    }
    let response = await axios.get(process.env.VUE_APP_API + `admin/author/`+ id + `/picture`, config);
    return response.data;
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function editAuthor(id, data) {
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") }
    }
    await axios.put(process.env.VUE_APP_API + "admin/author/" + id, data, config);
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function registerAuthor(author) {

  try {
    const config = {
      headers: {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'multipart/form-data'
      }
    }
    let response = await axios.post(process.env.VUE_APP_API + "admin/author/", author, config);
    return response;
  }
  catch (error) {
    return Promise.reject(error);
  }

}