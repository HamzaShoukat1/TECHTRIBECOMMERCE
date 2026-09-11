"use client"
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@base-ui/react/separator";
import Link from "next/link";
import { UsePayemntDetailsforCurrentUser } from "../hooks/UsePaymentDetail";


interface PaymentSuccessProps {
    amount?: string;
    orderId?: string;
    date?: string;
    paymentMethod?: string;
    productName?: string;
}
const { data:paymentdetails,isLoading,isError} = UsePayemntDetailsforCurrentUser()
export default function PaymentSuccess({
    amount = "$99.00",
    orderId = "ORD-7429X-99",
    date = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }),
    paymentMethod = "Visa ending in 4242",
    productName = "Pro Plan (Annual)",
}: PaymentSuccessProps) {
    return (
        <div className="flex min-h-[60vh] items-center justify-center p-4 font-poppins">
            <Card className="w-full max-w-md animate-in fade-in zoom-in-95 duration-300 border-muted/60 shadow-lg">
                <CardHeader className="text-center pb-4">
                    {/* Success Icon */}
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                        <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                        Payment Successful!
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Thank you for your purchase. Your order has been processed.
                    </p>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Price Breakdown Hero Box */}
                    <div className="rounded-lg bg-muted/40 p-4 text-center border border-muted/40">
                        <span className="text-sm font-medium text-muted-foreground block mb-1">
                            Amount Paid
                        </span>
                        <span className="text-3xl font-extrabold text-foreground tracking-tight">
                            {amount}
                        </span>
                    </div>

                    {/* Transaction Metadata */}
                    <div className="space-y-2.5 text-sm px-1">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Product</span>
                            <span className="font-medium text-foreground">{productName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Order ID</span>
                            <span className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">
                                {orderId}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Date & Time</span>
                            <span className="font-medium text-foreground">{date}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Payment Method</span>
                            <span className="font-medium text-foreground">{paymentMethod}</span>
                        </div>
                    </div>
                </CardContent>

                <Separator className="my-2" />

                <CardFooter className="flex flex-col gap-2 pt-4">
                    {/* Primary Action */}
                    {/* <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500"
            onClick={onGoToDashboard}
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button> */}

                    {/* Secondary Action Row */}
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <Link href={"/orders"}>

                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                                <ShoppingBag className="mr-2 h-3.5 w-3.5" />
                                View Orders
                            </Button>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
