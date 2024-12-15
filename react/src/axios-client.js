import axios from 'axios';

//we are creating an instance of the axios that includes a base url
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
    //This get's the token from the browser local storage and GET_TOKEN
    const token = localStorage.getItem('GET_TOKEN')
    //if the token is found in the local storage it is then added to request headers under the authorization
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

}, (error) => {
    return Promise.reject(error)
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;
    if(response.status === 401){
        localStorage.removeItem('GET_TOKEN') //Logs the user out
    }

    return Promise.reject(error);
})

export default axiosClient;