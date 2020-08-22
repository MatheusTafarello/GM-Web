import axios from 'axios';

const api = axios.create({
    baseURL: 'localhost:3000',
});

api.defaults.headers.common["Authorization"] = (typeof localStorage.jwtToken !== 'undefined' ? localStorage.jwtToken : null);

export default api;