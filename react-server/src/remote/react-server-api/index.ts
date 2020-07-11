import axios from 'axios';

export const reactClient = axios.create({
    baseURL:'http://localhost:2002',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})