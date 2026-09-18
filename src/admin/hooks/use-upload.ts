
import { uploadImage } from "@/src/app/services/upload.service";
import { useMutation } from "@tanstack/react-query";

export function useUploadImage() {
    return useMutation({
        mutationFn: uploadImage,
    });
}