"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../../../../src/admin/components/ui/sheet";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../src/admin/components/ui/form";

import { Button } from "../../../../../src/admin/components/ui/button";

import { colors, sizes } from "../../../../../src/admin/types";

import { Input } from "../../../../../src/admin/components/ui/input";

import { Checkbox } from "../../../../../src/admin/components/ui/checkbox";

import { useCreateProduct } from "../../../../../src/admin/hooks/use-create-product";

import {
  Product,
  productSchema,
} from "../../products/data/schema";

import { useUpdateProduct } from "@/src/admin/hooks/useUpdate-Product";
import { useUploadImage } from "@/src/admin/hooks/use-upload";


type ProductMutateDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: Product;
};

export function ProductMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: ProductMutateDrawerProps) {
  const isUpdate = !!currentRow;

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      productName: "",
      productDescription: "",
      productPrice: 0,
      productColors: [],
      productSizes: [],
      productImage: {
        url: "",
      },
    },
  });

  const { mutate: createProduct, isPending: isCreating } =
    useCreateProduct();

  const { mutate: updateProduct, isPending: isUpdating } =
    useUpdateProduct();

  // Image upload hook
  const {
    mutateAsync: uploadImage,
    isPending: isUploading,
  } = useUploadImage();

  const isPending =
    isCreating ||
    isUpdating ||
    isUploading;

  useEffect(() => {
    if (currentRow) {
      form.reset({
        _id: currentRow._id,
        productName: currentRow.productName,
        productDescription: currentRow.productDescription,
        productPrice: currentRow.productPrice,
        productColors: currentRow.productColors ?? [],
        productSizes: currentRow.productSizes ?? [],
        productImage: {
          url: currentRow.productImage?.url ?? "",
        },
      });
    } else {
      form.reset({
        productName: "",
        productDescription: "",
        productPrice: 0,
        productColors: [],
        productSizes: [],
        productImage: {
          url: "",
        },
      });
    }
  }, [currentRow, form]);

  const onSubmit = (data: any) => {
    console.log("asza", data);

    if (isUpdate && currentRow?._id) {
      updateProduct(
        {
          id: currentRow._id,
          data,
        },
        {
          onSuccess: () => {
            toast.success("Product updated successfully!", {
              position: "top-left",
            });

            onOpenChange(false);
            form.reset();
          },

          onError: () => {
            toast.error("Failed to update product.", {
              position: "top-left",
            });
          },
        }
      );

      return;
    }

    createProduct(data, {
      onSuccess: (data) => {
        console.log("asasa", data);

        toast.success("Product created successfully!", {
          position: "top-left",
        });

        onOpenChange(false);
        form.reset();
      },

      onError: () => {
        toast.error("Failed to create product.", {
          position: "top-left",
        });
      },
    });
  };

  const onError = (errors: unknown) => {
    console.error("Form Validation Errors:", errors);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        if (!value && isPending) return;

        onOpenChange(value);

        if (!value) {
          form.reset();
        }
      }}
    >
      <SheetContent className="flex flex-col">
        <SheetHeader className="text-start">
          <SheetTitle>
            {isUpdate ? "Update Product" : "Create Product"}
          </SheetTitle>

          <SheetDescription>
            {isUpdate
              ? "Update the product by providing the necessary information."
              : "Add a new product by providing the necessary information."}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id="product-form"
            className="flex-1 space-y-8 overflow-y-auto px-4"
            onSubmit={form.handleSubmit(onSubmit, onError)}
          >
            {/* Product Name */}
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormDescription>
                    Enter the name of the product.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormDescription>
                    Enter the short description of the product.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="productPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;

                        field.onChange(
                          value === "" ? "" : Number(value)
                        );
                      }}
                    />
                  </FormControl>

                  <FormDescription>
                    Enter the price of the product.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sizes */}
            <FormField
              control={form.control}
              name="productSizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>

                  <FormControl>
                    <div className="my-2 grid grid-cols-3 gap-4">
                      {sizes.map((size) => (
                        <div
                          className="flex items-center gap-2"
                          key={size}
                        >
                          <Checkbox
                            id={`size-${size}`}
                            checked={field.value?.includes(size)}
                            onCheckedChange={(checked) => {
                              const currentValues =
                                field.value || [];

                              if (checked) {
                                field.onChange([
                                  ...currentValues,
                                  size,
                                ]);
                              } else {
                                field.onChange(
                                  currentValues.filter(
                                    (value) => value !== size
                                  )
                                );
                              }
                            }}
                          />

                          <label
                            htmlFor={`size-${size}`}
                            className="cursor-pointer text-xs"
                          >
                            {size}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FormControl>

                  <FormDescription>
                    Select the available sizes.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Colors */}
            <FormField
              control={form.control}
              name="productColors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>

                  <FormControl>
                    <div className="my-2 grid grid-cols-3 gap-4">
                      {colors.map((color) => (
                        <div
                          className="flex items-center gap-2"
                          key={color}
                        >
                          <Checkbox
                            id={`color-${color}`}
                            checked={field.value?.includes(color)}
                            onCheckedChange={(checked) => {
                              const currentValues =
                                field.value || [];

                              if (checked) {
                                field.onChange([
                                  ...currentValues,
                                  color,
                                ]);
                              } else {
                                field.onChange(
                                  currentValues.filter(
                                    (value) => value !== color
                                  )
                                );
                              }
                            }}
                          />

                          <label
                            htmlFor={`color-${color}`}
                            className="flex cursor-pointer items-center gap-2 text-xs"
                          >
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{
                                backgroundColor: color,
                              }}
                            />

                            {color}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FormControl>

                  <FormDescription>
                    Select the available colors.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image */}
            <FormField
              control={form.control}
              name="productImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>

                  <FormControl>
                    <div>
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .webp"
                        className="text-sm"
                        disabled={isPending}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];

                          if (!file) return;

                          try {
                            const response =
                              await uploadImage(file);

                            // console.log(
                            //   "Image upload response:",
                            //   response
                            // );

                            field.onChange({
                              url: response.url,
                            });

                            toast.success(
                              "Product image uploaded successfully!",
                              {
                                position: "top-left",
                              }
                            );
                          } catch (error) {
                            console.error(
                              "Image upload error:",
                              error
                            );

                            toast.error(
                              error instanceof Error
                                ? error.message
                                : "Failed to upload image.",
                              {
                                position: "top-left",
                              }
                            );
                          }
                        }}
                      />

                      {isUploading ? (
                        <span className="text-sm font-medium text-yellow-600">
                          Uploading image...
                        </span>
                      ) : field.value?.url ? (
                        <span className="text-sm font-medium text-green-600">
                          ✓ Image is selected
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-red-600">
                          ✗ Image is not selected
                        </span>
                      )}
                    </div>
                  </FormControl>

                  <FormDescription>
                    Upload the product image.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button
              variant="outline"
              disabled={isPending}
            >
              Close
            </Button>
          </SheetClose>

          <Button
            form="product-form"
            type="submit"
            disabled={isPending}
          >
            {isPending
              ? isUpdate
                ? "Updating..."
                : "Creating..."
              : isUpdate
                ? "Save changes"
                : "Create Product"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ProductMutateDrawer;
