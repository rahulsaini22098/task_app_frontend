import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000,
    headers:{
        "content-type": "application/json"
    }
});

export default instance