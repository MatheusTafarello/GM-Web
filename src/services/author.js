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

export async function registerAuthor(author){
  
  try{
    const headers = { 
      'Authorization': localStorage.getItem("token"),
      'Content-Type': 'multipart/form-data'
    }
    let response = await axios.post(process.env.VUE_APP_API + "admin/author/", author, headers);
    console.log(response);

    return true;
  }
  catch(error){
      if (error.response) {
        console.log(error.response.data);

      }  else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error triggered:', error.message);
      }
      console.log('Error Config: ',error.config);
  }
  
}