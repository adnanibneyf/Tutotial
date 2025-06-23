import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:4000' });
export const signup = (n: string, e: string, p: string) =>
  API.post('/signup', { name: n, email: e, password: p });
export const login   = (e: string, p: string) =>
  API.post('/login', { email: e, password: p });
export const getMe   = (t: string) =>
  API.get('/me', { headers: { Authorization: `Bearer ${t}` } });
