import axios from "axios";
const instance = axios.create({
    baseURL :"http://localhost:8080/",
    headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer token"
    },
    timeout:3000
})

export default instance