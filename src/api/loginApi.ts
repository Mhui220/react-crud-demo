import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const login = async (user: { username: string; password: string }) => {
  const res = await axios.post(`${API_BASE_URL}/login`, user);
  return res.data;
};