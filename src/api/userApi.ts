import api from "./api";

export const getUsers = async () => {
  const res = await api.get('/Employees')
  return res.data
}

export const createUser = async (user: { name: string; email: string }) => {
  const res = await api.post('/Employees', user)
  return res.data
}

export const getUserDetails = async (id: string) => {
  const res = await api.get(`/Employees/${id}`)
  return res.data
}

export const editUser = async (id: string, user: { name: string; email: string }) => {
  const res = await api.put(`/Employees/${id}`, user)
  return res.data
}

export const removeUser = async (id: string) => {
  await api.delete(`/Employees/${id}`)
}