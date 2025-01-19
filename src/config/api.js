import axios from 'axios';

export const API_URL = "https://mysql-production-e1db.up.railway.app";


export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});
