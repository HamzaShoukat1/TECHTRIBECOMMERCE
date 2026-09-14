// "use client";

// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";

// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from "../../components/ui/sheet";
// import { ScrollArea } from "../../components/ui/scroll-area";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../../components/ui/form";
// import { Checkbox } from "../../components/ui/checkbox";

// import { colors, sizes } from "../../types";
// import { productSchema, Product } from "./data/schema";
// import { useCreateProduct } from "../../hooks/use-create-product";
// import { Button } from "../../components/ui/button";
// import { useMutation } from "@tanstack/react-query";
// import { createProduct } from "@/src/app/services/product.service";

// export function AddProduct() {
//   const router = useRouter();
//   const form = useForm<Product>({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       productName: "",
//       productDescription: "",
//       productPrice: 0,
//       productColors: [],
//       productSizes: [],
//       productImage: {},
//     },
//   });

//   const { mutate: createProduct, isPending } = useCreateProduct();


//   const onSubmit = (data: Product) => {
//     console.log(data)
//     createProduct(data)
//     // createProduct(data, {
//     //   onSuccess: () => {
//     //     toast.success("Product has been created successfully!", {
//     //       position: "top-left",
//     //     });
//     //     router.push("/admin/dashboard");
//     //     form.reset();
//     //   },
//     //   onError: (error) => {
//     //     toast.error(error.message || "Failed to create product", {
//     //       position: "top-left",
//     //     });
//     //   },
//     // });

//   };

//   return (
//     <Sheet open={true} onOpenChange={() => router.back()}>
//       <SheetContent>
//         <ScrollArea className="h-screen">
//           <SheetHeader>
//             <SheetTitle className="mb-4">Add Product</SheetTitle>
//             <SheetDescription asChild>
//               <Form {...form}>
//                 <form
//                   className="space-y-8 pr-4"
//                   onSubmit={form.handleSubmit(onSubmit)}
//                 >
//                   <FormField
//                     control={form.control}
//                     name="productName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Product Name</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormDescription>
//                           Enter the name of the product.
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="productDescription"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Short Description</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormDescription>
//                           Enter the short description of the product.
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="productPrice"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Price</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             {...field}
//                             onChange={(e) => {
//                               const val = e.target.value;
//                               field.onChange(val === "" ? "" : Number(val));
//                             }}
//                             value={field.value ?? ""}
//                           />
//                         </FormControl>
//                         <FormDescription>
//                           Enter the price of the product.
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="productSizes"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Sizes</FormLabel>
//                         <FormControl>
//                           <div className="grid grid-cols-3 gap-4 my-2">
//                             {sizes.map((size) => (
//                               <div
//                                 className="flex items-center gap-2"
//                                 key={size}
//                               >
//                                 <Checkbox
//                                   id={`size-${size}`}
//                                   checked={field.value?.includes(size)}
//                                   onCheckedChange={(checked) => {
//                                     const currentValues = field.value || [];
//                                     if (checked) {
//                                       field.onChange([...currentValues, size]);
//                                     } else {
//                                       field.onChange(
//                                         currentValues.filter((v) => v !== size)
//                                       );
//                                     }
//                                   }}
//                                 />
//                                 <label
//                                   htmlFor={`size-${size}`}
//                                   className="text-xs cursor-pointer"
//                                 >
//                                   {size}
//                                 </label>
//                               </div>
//                             ))}
//                           </div>
//                         </FormControl>
//                         <FormDescription>
//                           Select the available sizes for the product.
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="productColors"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Colors</FormLabel>
//                         <FormControl>
//                           <div className="grid grid-cols-3 gap-4 my-2">
//                             {colors.map((color) => (
//                               <div
//                                 className="flex items-center gap-2"
//                                 key={color}
//                               >
//                                 <Checkbox
//                                   id={`color-${color}`}
//                                   checked={field.value?.includes(color)}
//                                   onCheckedChange={(checked) => {
//                                     const currentValues = field.value || [];
//                                     if (checked) {
//                                       field.onChange([...currentValues, color]);
//                                     } else {
//                                       field.onChange(
//                                         currentValues.filter((v) => v !== color)
//                                       );
//                                     }
//                                   }}
//                                 />
//                                 <label
//                                   htmlFor={`color-${color}`}
//                                   className="text-xs flex items-center gap-2 cursor-pointer"
//                                 >
//                                   <div
//                                     className="w-2 h-2 rounded-full"
//                                     style={{ backgroundColor: color }}
//                                   />
//                                   {color}
//                                 </label>
//                               </div>
//                             ))}
//                           </div>
//                         </FormControl>
//                         <FormDescription>
//                           Select the available colors for the product.
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="productImage"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Images</FormLabel>
//                         <FormControl>
//                           <div>
//                             {form
//                               .watch("productColors")
//                               ?.map((color: string) => (
//                                 <div
//                                   className="flex items-center gap-4 mb-4"
//                                   key={color}
//                                 >
//                                   <div className="flex items-center gap-2">
//                                     <div
//                                       className="w-4 h-4 rounded-full border border-neutral-200"
//                                       style={{ backgroundColor: color }}
//                                     />
//                                     <span className="text-sm font-medium min-w-20">
//                                       {color}:
//                                     </span>
//                                   </div>

//                                   <input
//                                     type="file"
//                                     accept="image/*"
//                                     className="text-sm"
//                                     onChange={async (e) => {
//                                       const file = e.target.files?.[0];
//                                       if (!file) return;

//                                       try {
//                                         const formData = new FormData();
//                                         formData.append("file", file);
//                                         formData.append(
//                                           "upload_preset",
//                                           process.env
//                                             .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
//                                           "ecommerce"
//                                         );

//                                         const response = await fetch(
//                                           `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//                                           {
//                                             method: "POST",
//                                             body: formData,
//                                           }
//                                         );

//                                         const data = await response.json();

//                                         if (data.secure_url) {
//                                           const currentImages =
//                                             field.value || {};
//                                           field.onChange({
//                                             ...currentImages,
//                                             [color]: data.secure_url,
//                                           });
//                                           toast.success(
//                                             `Image for color ${color} uploaded successfully!`,
//                                             {
//                                               position: "top-left",
//                                             }
//                                           );
//                                         } else {
//                                           toast.error(
//                                             data.error?.message ||
//                                             `Failed to upload image for color ${color}`
//                                           );
//                                         }
//                                       } catch (error) {
//                                         toast.error(
//                                           "Failed to upload image due to a network error",
//                                           {
//                                             position: "top-left",
//                                           }
//                                         );
//                                       }
//                                     }}
//                                   />

//                                   {field.value?.[color as keyof typeof field.value] ? (
//                                     <span className="text-green-600 text-sm font-medium">
//                                       ✓ Image is selected
//                                     </span>
//                                   ) : (
//                                     <span className="text-red-600 text-sm font-medium">
//                                       ✗ Image is not selected
//                                     </span>
//                                   )}

//                                 </div>
//                               ))}
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <Button
//                     className="cursor-pointer"
//                     type="submit"
//                     disabled={isPending}
//                   >
//                     {isPending ? (
//                       <Loader2 className="animate-spin" />
//                     ) : (
//                       "Submit"
//                     )}
//                   </Button>
//                 </form>
//               </Form>
//             </SheetDescription>
//           </SheetHeader>
//         </ScrollArea>
//       </SheetContent>
//     </Sheet>
//   );
// }

// export default AddProduct;





'use client'

import { Search } from "lucide-react"
import { Header } from "../../components/layout/header"
import { TasksProvider } from "./components/tasks-provider"
import { ThemeSwitch } from "../../components/theme-switch"
import { ProfileDropdown } from "../../components/profile-dropdown"
import { TasksPrimaryButtons } from "./components/tasks-primary-buttons"
import { TasksTable } from "./components/tasks-table"
import { TasksDialogs } from "./components/tasks-dialogs"
import { Main } from "../../components/layout/main"
import { ConfigDrawer } from "../../components/config-drawer"


export function Products() {
  return (
    <TasksProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Orders</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <TasksPrimaryButtons />
        </div>
        <TasksTable />
      </Main>

      <TasksDialogs />
    </TasksProvider>
  )
}
