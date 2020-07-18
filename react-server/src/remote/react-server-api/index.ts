import axios from 'axios';

export const reactClient = axios.create({
    //will want to change this for deployment
    baseURL:'http://localhost:2004', //change to load balancer IP:Port
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})