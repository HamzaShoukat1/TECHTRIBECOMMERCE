"use client"

import { columns } from "./columns"
import { UseGetAllOrders } from '../../hooks/UseGetAllOrders'
import UsableSkeleton from '../../Components/UsableSkeleton'
import { DataTable } from "./data-table"

export default function page() {

    const { data: AllOrder, isLoading, isError } = UseGetAllOrders()
    console.log("sa",AllOrder)

    {
        isLoading ? (
            <UsableSkeleton />
        ) : isError ? (
            <p className="px-6 py-16 text-center text-[#9F9F9F]">
                Unable to load your cart.
            </p>
        ) : ""}







    return (
        <div>

            <DataTable columns={columns} data={AllOrder ?? []} />
        </div>
    )
}
