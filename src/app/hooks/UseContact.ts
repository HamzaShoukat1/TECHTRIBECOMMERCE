import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createContact } from "../services/Contact.Service";

export function UseContact() {

    return useMutation({
        mutationFn: (contactData: { name: string, email: string, subject: string, message: string }) => createContact(contactData),
        onSuccess: (data) => {
            toast.success("message sent SuccessFully,We will get back to you", {
                position: "top-left"
            })

        },
        onError: (err) => {
            if (err instanceof Error) {
                if (err.message.includes("please provide all details")) {
                    toast.error("message cant sent ", { position: "top-left" });
                }
            } else {
                toast.error("An unexpected error occurred", { position: "top-left" });
            }

        }
    });
}