import axios from 'axios';

const url = 'https://api.themoviedb.org/3';
export const axiosInstance = axios.create({
  baseURL: url,
});
