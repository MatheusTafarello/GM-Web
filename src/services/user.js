import axios from 'axios';

export async function getUsers(permissionId) {
  try {
    let config = {
      headers: { Authorization: localStorage.getItem("token") }
    }
    if(permissionId){
      config.params = {permissionId};
    }
    const response = await axios.get(process.env.VUE_APP_API + 'admin/user', config)
    return response.data;
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function deleteUser(id) {
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") }
    }
    await axios.delete(process.env.VUE_APP_API + "admin/user/" + id, config);
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function createUser(data) {
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") }
    };
    await axios.post(process.env.VUE_APP_API + "admin/user/", data, config);
    return true;
  } catch (error) {
    return Promise.reject(error)
  }

}