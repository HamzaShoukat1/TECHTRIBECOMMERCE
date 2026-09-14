
"use client";

import type { Order } from "../../utils/Types";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { colorClass } from "../../utils";
function statusClass(status: Order["status"]) {
    if (status === "PAID") return "bg-emerald-100 text-emerald-700";

    if (status === "FAILED" || status === "CANCELLED") {
        return "bg-red-100 text-red-700";
    }

    return "bg-amber-100 text-amber-700";
}



export function OrdersTable({ orders }: { orders: Order[] }) {
    return (
        <div className="overflow-hidden rounded-sm border border-[#EEE3D0]">
            <Table>
                <TableHeader className="bg-[#F9F1E7]">
                    <TableRow>
                        {[
                            "Order ID",
                            "Customer",
                            "Purchased items",
                            "Status",
                            "Total",
                            "Date",
                        ].map((heading) => (
                            <TableHead key={heading} className="px-5 py-4">
                                {heading}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="h-32 text-center text-[#9F9F9F]"
                            >
                                No orders found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell className="px-5 py-4 font-mono text-xs">
                                    #{order._id.slice(-8).toUpperCase()}
                                </TableCell>

                                <TableCell className="px-5 py-4">
                                    <div className="font-medium">
                                        {order.customer.firstName}{" "}
                                        {order.customer.lastName}
                                    </div>

                                    <div className="text-xs text-muted-foreground">
                                        {order.customer.email}
                                    </div>
                                </TableCell>

                                <TableCell className="min-w-95 px-5 py-4">
                                    <div className="space-y-3">
                                        {order.items.map((item, index) => {
                                            const productId =
                                                typeof item.productId === "string"
                                                    ? item.productId
                                                    : item.productId._id;

                                            const productImage =
                                                typeof item.productImage === "string"
                                                    ? item.productImage
                                                    : item.productImage?.url ??
                                                      item.image ??
                                                      item.product?.productImage?.url ??
                                                      (typeof item.productId === "object"
                                                          ? item.productId.productImage?.url
                                                          : undefined);

                                            return (
                                                <div
                                                    key={`${order._id}-${productId}-${index}`}
                                                    className="flex items-center gap-3"
                                                >
                                                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#F9F1E7]">
                                                        {productImage ? (
                                                            <img
                                                                src={productImage}
                                                                alt={item.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full items-center justify-center text-[10px] text-[#9F9F9F]">
                                                                No image
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate font-medium">
                                                            {item.name}
                                                        </p>

                                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                                            <span>
                                                                Qty: {item.quantity}
                                                            </span>

                                                            {item.color && (
                                                                <span className="inline-flex items-center gap-1.5">
                                                                    Color:

                                                                    <span
                                                                        className={`inline-block h-3.5 w-3.5 rounded-full border ${colorClass(
                                                                            item.color
                                                                        )}`}
                                                                        title={item.color}
                                                                    />

                                                                    <span className="capitalize">
                                                                        {item.color}
                                                                    </span>
                                                                </span>
                                                            )}

                                                            {item.size && (
                                                                <span>
                                                                    Size: {item.size}
                                                                </span>
                                                            )}

                                                            <span>
                                                                Unit:{" "}
                                                                {new Intl.NumberFormat(
                                                                    "en-US",
                                                                    {
                                                                        style: "currency",
                                                                        currency:
                                                                            order.currency,
                                                                    }
                                                                ).format(item.unitPrice)}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <span className="shrink-0 text-sm font-semibold">
                                                        {new Intl.NumberFormat(
                                                            "en-US",
                                                            {
                                                                style: "currency",
                                                                currency:
                                                                    order.currency,
                                                            }
                                                        ).format(
                                                            item.unitPrice *
                                                                item.quantity
                                                        )}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </TableCell>

                                <TableCell className="px-5 py-4">
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </span>
                                </TableCell>

                                <TableCell className="px-5 py-4 text-right font-semibold">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: order.currency,
                                    }).format(order.subtotal)}
                                </TableCell>

                                <TableCell className="px-5 py-4 text-xs text-muted-foreground">
                                    {new Intl.DateTimeFormat("en-US", {
                                        dateStyle: "medium",
                                    }).format(new Date(order.createdAt))}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

