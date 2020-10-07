import axios from 'axios';

export async function getUsers() {
  try {
    const headers = { Authorization: localStorage.getItem("token") }
    const response = await axios.get(process.env.VUE_APP_API + 'admin/user', headers)
    return response.data;
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function deleteUser(id) {
  try {
    const headers = { Authorization: localStorage.getItem("token") }
    await axios.delete(process.env.VUE_APP_API + "admin/user/" + id, headers);
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function createUser(data) {
  try {
    const headers = { Authorization: localStorage.getItem("token") };
    await axios.post(process.env.VUE_APP_API + "admin/user/", data, headers);
    return true;
  } catch (error) {
    return Promise.reject(error)
  }

}