import axios from 'axios';
import { baseUrl } from './config/connectDB';

const instance = axios.create({
   baseURL: baseUrl
});

instance.interceptors.request.use((config):any=>{
config.headers.Authorization=window.localStorage.getItem('token');
return config;
})

export default instance;