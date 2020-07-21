import axios from 'axios';
import { baseUrl } from '../../environment';

export const reactClient = axios.create({
    //will want to change this for deployment
    baseURL: baseUrl, //'http://localhost:2004', //change to load balancer IP:Port
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})