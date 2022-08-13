// apiKey is https://social-network.samuraijs.com/ access string
import axios, { AxiosInstance } from 'axios';
// import { UserType, PhotosType } from '../@types';
export const API_URL = 'http://localhost:5000/api/';
// export const API_KEY = process.env.REACT_APP_API_KEY;

export const API_KEY = 'ca03na188ame03u1d78620de67282882a84';

export const todosAxiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
  headers: {
    apiKey: API_KEY,
  },
});
