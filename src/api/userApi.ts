const API_URL = "https://69b3f335e224ec066bdda139.mockapi.io/api/user/users"

export const getUsers = async () => {
  const res = await fetch(API_URL)
  return res.json()
}

export const createUser = async (user: { name: string; email: string }) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })

  return res.json()
}

export const editUser = async (id: string, user: { name: string; email: string }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })

  return res.json()
}

export const removeUser = async (id: string) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
}