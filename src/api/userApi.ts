import axios from "axios"

const API_URL = "https://69b3f335e224ec066bdda139.mockapi.io/api/user/users"

export const getUsers = async () => {
  const res = await axios.get(API_URL)
  return res.data
}

export const createUser = async (user: { name: string; email: string }) => {
  const res = await axios.post(API_URL, user)
  return res.data
}

export const getUserDetails = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`)
  return res.data
}

export const editUser = async (id: string, user: { name: string; email: string }) => {
  const res = await axios.put(`${API_URL}/${id}`, user)
  return res.data
}

export const removeUser = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`)
}