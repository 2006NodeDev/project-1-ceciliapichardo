import axios from 'axios';

export const reactClient = axios.create({
    baseURL:'http://localhost:2004',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})