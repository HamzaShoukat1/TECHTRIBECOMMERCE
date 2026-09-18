"use client";

import { Avatar, AvatarFallback } from "@admin/components/ui/avatar";
import { useAllOrdersForTable } from "@/src/admin/hooks/use-all-Order";

export function RecentOrders() {
  const { data, isLoading, isError } = useAllOrdersForTable();

  const orders = data ?? []

  // Only show the latest 5 orders
  const recentOrders = orders.slice(0, 5);

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="flex items-center gap-4 animate-pulse"
          >
            <div className="h-9 w-9 rounded-full bg-muted" />

            <div className="flex flex-1 items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-muted" />
                <div className="h-3 w-40 rounded bg-muted" />
              </div>

              <div className="h-4 w-20 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        Failed to load recent orders.
      </div>
    );
  }

  if (recentOrders.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        No recent orders found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {recentOrders.map((order:any) => {
        const fullName =
          `${order.customer.firstName} ${order.customer.lastName}`.trim();

        const initials =
          `${order.customer.firstName?.[0] ?? ""}${order.customer.lastName?.[0] ?? ""}`
            .toUpperCase();

        return (
          <div
            key={order._id}
            className="flex items-center gap-4"
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex flex-1 flex-wrap items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm leading-none font-medium">
                  {fullName}
                </p>

                <p className="text-sm text-muted-foreground">
                  {order.customer.email}
                </p>
              </div>

              <div className="font-medium">
                +{order.currency} {order.subtotal.toFixed(2)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}