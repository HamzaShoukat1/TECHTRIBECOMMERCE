"use client";

import Image from "next/image";
import { Package, MapPin, User, CreditCard, CalendarDays, Hash, Mail, Phone } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@admin/components/ui/sheet";

import { Badge } from "@admin/components/ui/badge";
import { Separator } from "@admin/components/ui/separator";
import { Skeleton } from "@admin/components/ui/skeleton";

import { UseOrderDetail } from "@/src/admin/hooks/use-all-Order";
import { formatDisplayDate } from "@/src/app/utils";

type OrderDetailsDrawerProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    orderId: string | null;
};

function getStatusVariant(status: string) {
    switch (status) {
        case "PENDING":
            return "default";
        case "SHIPPED":
            return "secondary";
        case "DELIVERED":
            return "destructive";
        default:
            return "secondary";
    }
}

export function OrderDetailsDrawer({
    open,
    onOpenChange,
    orderId,
}: OrderDetailsDrawerProps) {
    const {
        data: order,
        isLoading,
        isError,
    } = UseOrderDetail(orderId ?? "");

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
                <SheetHeader className="border-b pb-4">
                    <div className="flex items-start justify-between gap-4 pr-6">
                        <div>
                            <SheetTitle className="text-xl">
                                Order Details
                            </SheetTitle>

                            <SheetDescription className="mt-1">
                                View complete information about this order.
                            </SheetDescription>
                        </div>

                        {order && (
                            <Badge variant={getStatusVariant(order.status)}>
                                {order.status}
                            </Badge>
                        )}
                    </div>
                </SheetHeader>

                <div className="px-1 py-5">
                    {isLoading && (
                        <div className="space-y-6">
                            <Skeleton className="h-24 w-full rounded-xl" />

                            <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="h-20 rounded-xl" />
                                <Skeleton className="h-20 rounded-xl" />
                            </div>

                            <Skeleton className="h-48 w-full rounded-xl" />
                            <Skeleton className="h-40 w-full rounded-xl" />
                            <Skeleton className="h-40 w-full rounded-xl" />
                        </div>
                    )}

                    {isError && !isLoading && (
                        <div className="flex min-h-60 items-center justify-center">
                            <div className="text-center">
                                <Package className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

                                <h3 className="font-semibold">
                                    Failed to load order
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    We could not fetch the order details.
                                </p>
                            </div>
                        </div>
                    )}

                    {order && !isLoading && !isError && (
                        <div className="space-y-6">
                            {/* Order Summary */}
                            <div className="rounded-xl border bg-muted/30 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                        <Package className="h-5 w-5 text-primary" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm text-muted-foreground">
                                            Order ID
                                        </p>

                                        <p className="truncate font-mono text-sm font-semibold">
                                            {order._id}
                                        </p>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="mb-1 flex items-center gap-2 text-muted-foreground">
                                            <CalendarDays className="h-4 w-4" />
                                            <span className="text-xs">Created</span>
                                        </div>

                                        <p className="text-sm font-medium">
                                            {formatDisplayDate(order.createdAt)}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="mb-1 flex items-center gap-2 text-muted-foreground">
                                            <CalendarDays className="h-4 w-4" />
                                            <span className="text-xs">Updated</span>
                                        </div>

                                        <p className="text-sm font-medium">
                                            {formatDisplayDate(order.updatedAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Customer */}
                            <section>
                                <div className="mb-3 flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <h3 className="font-semibold">Customer</h3>
                                </div>

                                <div className="rounded-xl border p-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <InfoItem
                                            icon={<User className="h-4 w-4" />}
                                            label="Name"
                                            value={`${order.customer.firstName} ${order.customer.lastName}`}
                                        />

                                        <InfoItem
                                            icon={<Mail className="h-4 w-4" />}
                                            label="Email"
                                            value={order.customer.email}
                                        />

                                        <InfoItem
                                            icon={<Phone className="h-4 w-4" />}
                                            label="Phone"
                                            value={order.customer.phone}
                                        />

                                        <InfoItem
                                            icon={<Hash className="h-4 w-4" />}
                                            label="User ID"
                                            value={order.userId}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Items */}
                            <section>
                                <div className="mb-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Package className="h-4 w-4" />
                                        <h3 className="font-semibold">Order Items</h3>
                                    </div>

                                    <span className="text-sm text-muted-foreground">
                                        {order.items.length}{" "}
                                        {order.items.length === 1 ? "item" : "items"}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {order.items.map((item: any, index: number) => (
                                        <div
                                            key={`${item.name}-${index}`}
                                            className="rounded-xl border p-3"
                                        >
                                            <div className="flex gap-3">
                                                {/* Product Image */}
                                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-muted">
                                                    {item.productImage ? (
                                                        <Image
                                                            src={item.productImage}
                                                            alt={item.name}
                                                            fill
                                                            sizes="80px"
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center">
                                                            <Package className="h-6 w-6 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Product Details */}
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <h4 className="font-medium">
                                                            {item.name}
                                                        </h4>

                                                        <p className="whitespace-nowrap font-semibold">
                                                            {order.currency}{" "}
                                                            {(item.unitPrice * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>

                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        Unit price: {order.currency}{" "}
                                                        {item.unitPrice.toFixed(2)}
                                                    </p>

                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        <Badge variant="outline">
                                                            Qty: {item.quantity}
                                                        </Badge>

                                                        {item.size && (
                                                            <Badge variant="outline">
                                                                Size: {item.size}
                                                            </Badge>
                                                        )}

                                                        {item.color && (
                                                            <Badge variant="outline">
                                                                Color: {item.color}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Payment / Total */}
                            <section>
                                <div className="mb-3 flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    <h3 className="font-semibold">Payment Summary</h3>
                                </div>

                                <div className="rounded-xl border p-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Subtotal
                                            </span>

                                            <span className="font-medium">
                                                {order.currency}{" "}
                                                {order.subtotal.toFixed(2)}
                                            </span>
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">
                                                Total
                                            </span>

                                            <span className="text-lg font-bold">
                                                {order.currency}{" "}
                                                {order.subtotal.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Address */}
                            <section>
                                <div className="mb-3 flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <h3 className="font-semibold">
                                        Shipping Address
                                    </h3>
                                </div>

                                <div className="rounded-xl border p-4">
                                    <div className="space-y-2 text-sm">
                                        <p className="font-medium">
                                            {order.shippingAddress.streetAddress}
                                        </p>

                                        <p className="text-muted-foreground">
                                            {order.shippingAddress.city},{" "}
                                            {order.shippingAddress.zipCode}
                                        </p>

                                        <p className="text-muted-foreground capitalize">
                                            {order.shippingAddress.country}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Stripe */}
                            {order.stripeSessionId && (
                                <section>
                                    <div className="mb-3 flex items-center gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        <h3 className="font-semibold">
                                            Payment Reference
                                        </h3>
                                    </div>

                                    <div className="rounded-xl border bg-muted/30 p-4">
                                        <p className="mb-1 text-xs text-muted-foreground">
                                            Stripe Session ID
                                        </p>

                                        <p className="break-all font-mono text-xs">
                                            {order.stripeSessionId}
                                        </p>
                                    </div>
                                </section>
                            )}

                            {/* Cart */}
                            <div className="rounded-xl border bg-muted/30 p-4">
                                <p className="mb-1 text-xs text-muted-foreground">
                                    Cart ID
                                </p>

                                <p className="break-all font-mono text-xs">
                                    {order.cartId}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex gap-3">
            <div className="mt-0.5 text-muted-foreground">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                    {label}
                </p>

                <p className="break-words text-sm font-medium">
                    {value}
                </p>
            </div>
        </div>
    );
}

export default OrderDetailsDrawer;