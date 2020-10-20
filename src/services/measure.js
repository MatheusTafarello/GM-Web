import axios from "axios";

export async function registerMeasure(measure){
    try{
        const config ={
            headers: { Authorization: localStorage.getItem("token") }
        }
        let response = await axios.post(process.env.VUE_APP_API + "admin/measure/", measure, config);
        return response;
    }
    catch(error){
        return Promise.reject(error);
    }
}