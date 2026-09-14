import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../services/user.service'

export function useAllUsers() {
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: getAllUsers,
    staleTime: 1000 * 60,
  })
}
