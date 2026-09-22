"use client"



import { useQuery } from "@tanstack/react-query";
import { getPaymentDetails } from "../services/payment.service";

export function UsePayemntDetailsforCurrentUser(session_id: any) {
    return useQuery({
        queryKey: ["payment", session_id],
        queryFn: () => getPaymentDetails(session_id),
    });
}