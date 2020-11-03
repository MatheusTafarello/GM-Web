import axios from "axios"

export async function getMeasure(assistedId) {
    try {
      const config = {
        headers: { Authorization: localStorage.getItem("token") }
      }
      if(assistedId){
        config.params = {assistedId};
      }
      let response = await axios.get(process.env.VUE_APP_API + "admin/measure" , config);
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
