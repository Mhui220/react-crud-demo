import type { User } from "../types/User"
import { getUsers, createUser, editUser, removeUser } from "../api/userApi"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

type UpdateUserParams = {
  id: string;
  user: User;
};

export function useUsers() {

  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: 5,
    retryDelay: 100,
  });

  const addUser = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const updateUser = useMutation({
    mutationFn: ({ id, user }: UpdateUserParams) => editUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const deleteUser = useMutation({
    mutationFn: removeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    users: usersQuery.data ?? [],
    loading: usersQuery.isLoading,
    error: usersQuery.error,

    addUser: addUser.mutate,
    updateUser: updateUser.mutate,
    deleteUser: deleteUser.mutate,
  };
  
}
