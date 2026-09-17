import { logoutUser } from "@/src/app/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // Use "next/router" if using the pages router
import { toast } from "sonner";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate: logout,isPending } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            toast.success("Logged out successfully.",{
                position:"top-left"
            });
            queryClient.setQueryData(["currentUser"], null);
            router.push("/login");
        },
        onError: () => {
            toast.error("Logout failed. Please try again.");
        }
    });

    return { logout,isPending };
};
