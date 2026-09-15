"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/src/admin/components/confirm-dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/src/admin/components/ui/alert";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { useDeleteProduct } from "@/src/admin/hooks/use-Delete-Product";

import type { Product } from "../data/schema";

const CONFIRM_WORD = "DELETE";

type ProductsMultiDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  onDeleted?: () => void;
};

export function ProductsMultiDeleteDialog({
  open,
  onOpenChange,
  products,
  onDeleted,
}: ProductsMultiDeleteDialogProps) {
  const [value, setValue] = useState("");
const normalizeValue = value.trim().toUpperCase()
const inConfirmed = normalizeValue === CONFIRM_WORD


  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteProduct,
    isPending,
  } = useDeleteProduct();



  const handleDelete = async () => {
    if (!inConfirmed) {
      toast.error(`Please type "${CONFIRM_WORD}" to confirm.`,{
        position:"top-left"
      });
      return;
    }

    if (products.length === 0) {
      toast.error("No products selected.");
      return;
    }

    // Make sure every selected product has an ID
    const missingId = products.some(
      (product) => !product._id
    );

    if (missingId) {
      toast.error(
        "One or more products are missing their ID."
      );
      return;
    }

    try {
      await Promise.all(
        products.map((product) =>
          deleteProduct(product._id)
        )
      );

      // Refresh products after deletion
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      toast.success(
        `${products.length} product${
          products.length > 1 ? "s" : ""
        } deleted successfully.`
      );

      setValue("");

      onOpenChange(false);

      onDeleted?.();
    } catch (error) {
      console.error("Delete products error:", error);

      toast.error(
        "Failed to delete one or more products."
      );
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    // Don't allow closing while deleting
    if (isPending) {
      return;
    }

    onOpenChange(isOpen);

    if (!isOpen) {
      setValue("");
    }
  };


  return (
    <ConfirmDialog
      open={open}
      onOpenChange={handleOpenChange}
      handleConfirm={handleDelete}
      disabled={
        !inConfirmed ||
        isPending ||
        products.length === 0
      }
      title={
        <span className="text-destructive">
          <AlertTriangle
            className="me-1 inline-block stroke-destructive"
            size={18}
          />
          Delete Products
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <strong>
              {products.length} product
              {products.length > 1 ? "s" : ""}
            </strong>
            ?
            <br />
            This action cannot be undone.
          </p>

          {/* Selected products */}
          <div className="max-h-40 overflow-y-auto rounded-md border p-3">
            <p className="mb-2 text-sm font-medium">
              Selected products:
            </p>

            <ul className="list-disc space-y-1 pl-5 text-sm">
              {products.map((product) => (
                <li key={product._id}>
                  {product.productName}
                </li>
              ))}
            </ul>
          </div>

          <Label className="my-4 flex flex-col items-start gap-1.5">
            <span>
              Confirm by typing {CONFIRM_WORD}
            </span>

            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
                placeholder='Type DELETE to confirm'
              autoFocus
              disabled={isPending}
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>

            <AlertDescription>
              Please be careful. This operation cannot be
              rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={
        isPending ? "Deleting..." : "Delete"
      }
      destructive
    />
  );
}



