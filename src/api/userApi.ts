import type { User } from "../types/User";
import api from "./api";

type QueryKey = ['users', number, number]

export const getUsers = async () => {
  const res = await api.get('/employees')
  return res.data
}

export const getUsersPage = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, page, pageSize] = queryKey
  const res = await api.get('/employees/', {
    params: {
      page,
      pageSize
    }
  })
  return res.data
}

export const createUser = async (user: { name: string; email: string }) => {
  const res = await api.post('/employees', user)
  return res.data
}

export const getUserDetails = async (id: string) => {
  const res = await api.get(`/employees/${id}`)
  return res.data
}

export const editUser = async (id: string, user: User) => {
  const res = await api.put(`/employees/${id}`, user)
  return res.data
}

export const removeUser = async (id: string) => {
  await api.delete(`/employees/${id}`)
}