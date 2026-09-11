"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDisplayDate } from "../../utils";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Order } from "../../utils/Types";
import { cn } from "@/src/lib/utils";

export const columns: ColumnDef<Order, unknown>[] = [
    // {
    //     id: "select",
    //     header: ({ table }: any) => (
    //         <Checkbox
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }: any) => (
    //         <Checkbox
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             checked={row.getIsSelected()}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "_id",
        header: "Order ID",
        cell: ({ row }: any) => {
            const id = row.getValue("_id") as string;
            return <span className="font-mono text-xs font-medium">#{id}</span>;
        },
    },
    {
        id: "customer",
        accessorFn: (row: any) => `${row.customer?.firstName} ${row.customer?.lastName} ${row.customer?.email}`,
        header: ({ column }: any) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Customer
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }: any) => {
            const customer = row.original.customer;
            return (
                <div className="flex flex-col">
                    <span className="font-medium capitalize text-sm">
                        {customer?.firstName} {customer?.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground">{customer?.email}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "items",
        header: "Items",
        cell: ({ row }: any) => {
            const items = row.original.items || [];

            if (items.length === 0) {
                return <div className="text-sm text-muted-foreground ">Loading items...</div>;

            }

            return (
                <div className="flex flex-col gap-2 min-w-[200px] max-w-[280px]">
                    {items.map((item: any, index: number) => {
                        const color = item.color || item.attributes?.color || item.variant?.color;
                        const size = item.size || item.attributes?.size || item.variant?.size;

                        return (
                            <div
                                key={item.id || item._id || index}
                                className="flex flex-col border-b border-muted last:border-0 pb-2 last:pb-0 gap-1 text-xs"
                            >
                                {/* Name and Quantity */}
                                <div className="flex justify-between items-start font-medium text-foreground">
                                    <span className="leading-tight">{item.name}</span>
                                    <span className="text-xs font-bold text-primary ml-2 shrink-0">
                                        x{item.quantity}
                                    </span>
                                </div>

                                {/* Color & Size Badges */}
                                {(color || size) && (
                                    <div className="flex items-center gap-1.5">
                                        {color && (
                                            <span className="inline-flex items-center gap-1 text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded font-medium">
                                                <span
                                                    className="w-2 h-2 rounded-full border border-black/10 shrink-0"
                                                    style={{ backgroundColor: color.toLowerCase() }}
                                                />
                                                {color}
                                            </span>
                                        )}
                                        {size && (
                                            <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-medium">
                                                Size: {size}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* SKU and Price */}
                                <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                                    {item.sku ? <span>SKU: {item.sku}</span> : <span />}
                                    {item.price !== undefined && (
                                        <span className="font-mono">
                                            ${(item.price * item.quantity).toFixed(2)}
                                            <span className="text-[9px] text-muted-foreground/70 ml-0.5">
                                                (${Number(item.price).toFixed(2)} ea)
                                            </span>
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: any) => {
            const status = (row.getValue("status") as string) || "";
            let colorClass = "bg-gray-200 text-gray-800 border-gray-300";

            if (status === "PAID" || status === "completed" || status === "success") {
                colorClass = "bg-emerald-500/15 text-emerald-700 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400";
            } else if (status === "FAILED" || status === "cancelled") {
                colorClass = "bg-red-500/15 text-red-700 border-red-300 dark:bg-red-500/20 dark:text-red-400";
            } else if (status === "PENDING") {
                colorClass = "bg-amber-500/15 text-amber-700 border-amber-300 dark:bg-amber-500/20 dark:text-amber-400";
            }

            return (
                <div
                    className={cn(
                        "px-2.5 py-0.5 rounded-full w-max text-xs font-semibold border",
                        colorClass
                    )}
                >
                    {status}
                </div>
            );
        },
    },
    {
        accessorKey: "subtotal",
        header: ({ column }: any) => (
            <Button
                variant="ghost"
                className="w-full justify-end"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Subtotal
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }: any) => {
            const subtotal = parseFloat(row.getValue("subtotal"));
            const currency = row.original.currency || "USD";
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency,
            }).format(subtotal);

            return <div className="text-right font-semibold text-sm">{formatted}</div>;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }: any) => {
            const createdAt = row.getValue("createdAt") as string;
            const formattedDate = formatDisplayDate ? formatDisplayDate(createdAt as any) : new Date(createdAt).toLocaleDateString();

            return <div className="text-xs text-muted-foreground">{formattedDate}</div>;
        },
    },
    // {
    //     id: "actions",
    //     cell: ({ row }: any) => {
    //         const order = row.original;

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         onClick={() => navigator.clipboard.writeText(order._id)}
    //                     >
    //                         Copy Order ID
    //                     </DropdownMenuItem>
    //                     {order.stripePaymentIntentId && (
    //                         <DropdownMenuItem
    //                             onClick={() => navigator.clipboard.writeText(order.stripePaymentIntentId)}
    //                         >
    //                             Copy Stripe Payment ID
    //                         </DropdownMenuItem>
    //                     )}
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem asChild>
    //                         <Link href={`/users/${order.userId}`}>
    //                             View Customer
    //                         </Link>
    //                     </DropdownMenuItem>
    //                     <DropdownMenuItem asChild>
    //                         <Link href={`/orders/${order._id}`}>
    //                             View Order Details
    //                         </Link>
    //                     </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
];