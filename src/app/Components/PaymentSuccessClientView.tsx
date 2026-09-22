// app/payment-success/PaymentSuccessClientView.tsx
"use client";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@base-ui/react/separator";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { UsePayemntDetailsforCurrentUser } from "../hooks/UsePaymentDetail";
import { formatDisplayDate } from "../utils";

interface ClientViewProps {
    sessionId: string | null;
}

export default function PaymentSuccessClientView({ sessionId }: ClientViewProps) {
    const { data: paymentdetails, isLoading, isError } = UsePayemntDetailsforCurrentUser(sessionId);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center p-4 font-poppins">
                <p className="text-muted-foreground animate-pulse">Loading Order details...</p>
            </div>
        );
    }

    if (isError) {
        console.error("Failed to fetch payment details, falling back to defaults.");
    }

    const displayAmount = ("$" + (paymentdetails?.amount?.$numberDecimal));
    const displayOrderId = paymentdetails?.orderId;
    const displayDate = formatDisplayDate(paymentdetails?.createdAt);
    const displayProduct = paymentdetails?.productName;

    return (
        <div className="flex min-h-[60vh] items-center justify-center p-4 font-poppins">
            <Card className="w-full max-w-md animate-in fade-in zoom-in-95 duration-300 border-muted/60 shadow-lg">
                <CardHeader className="text-center pb-4">
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
                    <div className="rounded-lg bg-muted/40 p-4 border border-muted/40 flex items-center justify-center">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-background rounded-md border border-muted/60">
                                    <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{displayProduct}</p>
                                    <p className="text-xs text-muted-foreground flex items-center justify-center">Order ID: {displayOrderId}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2.5 px-1">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Date & Time</span>
                            <span className="font-medium text-foreground text-right">{displayDate}</span>
                        </div>

                        <Separator className="bg-muted/60 my-2" />
                        <Separator className="bg-muted/60 my-2" />

                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Paid</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{displayAmount}</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 pt-2">
                    <Button className="w-full cursor-pointer" >
                        <Link href="/orders"> My Orders</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
