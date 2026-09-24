"use client";

import { UseGetAllOrders } from "../../../hooks/UseGetAllOrders";
import UsableSkeleton from "../../../Components/UsableSkeleton";
import { OrdersTable } from "./orders-table";

export default function OrdersPage() {
    const { data: orders, isLoading, isError } = UseGetAllOrders();
    return (
        <div className="min-h-screen px-4 py-12 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-8 text-3xl font-semibold font-poppins">My orders</h1>
                {isLoading ? <UsableSkeleton /> : isError ? (
                    <p className="border border-red-200 bg-red-50 px-6 py-16 text-center text-red-700">
                        Unable to load your orders.
                    </p>
                ) : <OrdersTable orders={orders ?? []} />}
            </div>
        </div>
    );
}

