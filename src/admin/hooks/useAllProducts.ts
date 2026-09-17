import { useQuery } from '@tanstack/react-query'
import {  getAllProductsForAdmin } from '@/src/app/services/product.service'

export function useAllProductsForamdin() {
    return useQuery({
        queryKey: ['products-admin'],
        queryFn: getAllProductsForAdmin,
        // staleTime: 1000 * 60,
    })
}
