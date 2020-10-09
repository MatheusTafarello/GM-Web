import axios from "axios";


export async function login(data) {
  if (data) {
    try {
      let res = await axios.post(process.env.VUE_APP_API + "admin/login", data);
      let { token, name } = res.data
      token = token.charAt(0).toUpperCase() + token.slice(1)
      localStorage.setItem("token", token)
      localStorage.setItem("name", name)

    } catch (e) {
      console.warn(e);
    }
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
}

export function isSignedIn() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }

  /*  try {
     const { exp: expiration } = decode(token);
     const isExpired = !!expiration && Date.now() > expiration * 1000;
 
     if (isExpired)
       return false;
 
     return true;
   } catch (_) {
     return false;
   } */
} 