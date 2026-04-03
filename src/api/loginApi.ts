import axios from "axios";

export const login = async (user: { username: string; password: string }) => {
  console.log(import.meta.env.VITE_API_URL)
  const res = await axios.post("/api/Auth/login", user);
  return res.data;
};