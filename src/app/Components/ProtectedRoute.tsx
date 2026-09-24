"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/user.service";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();

    const { data: currentUser, isLoading: isUserLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false,
    });

    useEffect(() => {
        if (!isUserLoading && !currentUser) {
            router.replace("/login");
        }
    }, [currentUser, isUserLoading, router]);

    if (isUserLoading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-100 border-t-yellow-400"></div>


                </div>
            </div>

        );
    }

    if (!currentUser) {
        return null;
    }

    return <>{children}</>;
}
