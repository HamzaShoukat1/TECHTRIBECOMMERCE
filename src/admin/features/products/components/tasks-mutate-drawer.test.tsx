"use client";

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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../../../src/admin/components/ui/form"
import { Button } from "../../../../../src/admin/components/ui/button"

import { colors, sizes } from "../../../../../src/admin/types"
import { Input } from "../../../../../src/admin/components/ui/input";
import { Checkbox } from "../../../../../src/admin/components/ui/checkbox";
import { useCreateProduct } from "../../../../../src/admin/hooks/use-create-product"


import { Product, productSchema } from "../../products/data/schema";

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

    defaultValues: currentRow ?? {
      productName: "",
      productDescription: "",
      productPrice: 0,
      productColors: [],
      productSizes: [],
      productImage: {
        url: ""
      }
    },
  });

  const { mutate: createProduct } = useCreateProduct();

  const onSubmit = (data: Product) => {
    console.log("Product data:", data);
    createProduct(data)


    toast.success(
      isUpdate
        ? "Product updated successfully!"
        : "Product created successfully!", {
      position: "top-left"

    }
    );

    onOpenChange(false);
    form.reset();
  };
  const onError = (errors: unknown) => {
    console.error("Form Validation Errors:", errors);
    toast.error("Please fill in all required fields properly.", {
      position: "top-left"
    });
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);
        form.reset();
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

            {/* Product Description */}
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

            {/* Product Price */}
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
                      onChange={(e) => {
                        const value = e.target.value;

                        field.onChange(
                          value === "" ? "" : Number(value)
                        );
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>

                  <FormDescription>
                    Enter the price of the product.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Sizes */}
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
                              const currentValues = field.value || [];

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
                    Select the available sizes for the product.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Colors */}
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
                              const currentValues = field.value || [];

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
                    Select the available colors for the product.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Images */}
            <FormField
              control={form.control}
              name="productImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>

                  <FormControl>
                    <div>
                      {form
                        .watch("productColors")
                        ?.map((color: string) => (
                          <div
                            className="mb-4 flex items-center gap-4"
                            key={color}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="h-4 w-4 rounded-full border border-neutral-200"
                                style={{
                                  backgroundColor: color,
                                }}
                              />

                              <span className="min-w-20 text-sm font-medium">
                                {color}:
                              </span>
                            </div>

                            <input
                              type="file"
                              accept=".jpg, .jpeg"

                              className="text-sm"

                              onChange={async (e) => {
                                const file = e.target.files?.[0];

                                if (!file) return;

                                try {
                                  const formData = new FormData();

                                  formData.append("file", file);

                                  formData.append(
                                    "upload_preset",
                                    process.env
                                      .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
                                    "ecommerce"
                                  );

                                  const response = await fetch(
                                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                                    {
                                      method: "POST",
                                      body: formData,
                                    }
                                  );

                                  const data =
                                    await response.json();
                                  console.log('sa', data)

                                  if (data.secure_url) {
                                    const currentImages =
                                      field.value || {};

                                    field.onChange({
                                      [color]: data.secure_url,
                                    });

                                    toast.success(
                                      `Image for ${color} uploaded successfully!`, {
                                      position: "top-left"
                                    }
                                    );
                                  } else {
                                    toast.error(
                                      data.error?.message ||
                                      `Failed to upload image for ${color}`, {
                                      position: "top-left"

                                    }
                                    );
                                  }
                                } catch {
                                  toast.error(
                                    "Failed to upload image due to a network error", {
                                    position: "top-left"

                                  }
                                  );
                                }
                              }}
                            />

                            {field.value?.[
                              color as keyof typeof field.value
                            ] ? (
                              <span className="text-sm font-medium text-green-600">
                                ✓ Image is selected
                              </span>
                            ) : (
                              <span className="text-sm font-medium text-red-600">
                                ✗ Image is not selected
                              </span>
                            )}
                          </div>
                        ))}
                    </div>
                  </FormControl>

                  <FormDescription>
                    Upload an image for each selected color.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />


          </form>
        </Form>

        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>

          <Button form="product-form" type="submit">
            {isUpdate ? "Save changes" : "Create Product"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ProductMutateDrawer;
