import axios from "axios";

export const login = async (user: { username: string; password: string }) => {
  const res = await axios.post("/api/Auth/login", user);
  return res.data;
};