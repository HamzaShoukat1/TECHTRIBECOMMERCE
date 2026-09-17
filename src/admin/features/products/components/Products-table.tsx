"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { formatDisplayDate } from "@/src/app/utils";

import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  filterFn_includesString,
  flexRender,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  tableFeatures,
  useTable,
  type ColumnDef,
  type RowSelectionState,
} from "@tanstack/react-table";

import { Trash2 } from "lucide-react";

import { Button } from "@admin/components/ui/button";
import { Input } from "@admin/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@admin/components/ui/table";

import { ProductsMultiDeleteDialog } from "./Product-multi-delete-dialog";

import type { Product } from "../data/schema";
import { toast } from "sonner";
import { set } from "zod";
import ProductMutateDrawer from "./Product-mutate-drawer";

/* -------------------------------------------------------
   TanStack Table v9 Features
------------------------------------------------------- */

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  columnVisibilityFeature,

  rowPaginationFeature,
  rowSelectionFeature,

  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),

  filterFns: {
    includesString: filterFn_includesString,
  },
});

type ProductsTableProps = {
  data: Product[];
  isLoading?: boolean;
  isError?: boolean;
};

export function ProductsTable({
  data,
  isLoading = false,
  isError = false,
}: ProductsTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");

 
  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>({});

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] =
    useState<Product | undefined>();

  /* -------------------------------------------------------
     Columns
  ------------------------------------------------------- */

  const columns = useMemo<
    ColumnDef<typeof features, Product, unknown>[]
  >(
    () => [
      /* ---------------------------------------------------
         Select checkbox
      --------------------------------------------------- */

      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            ref={(element) => {
              if (element) {
                element.indeterminate =
                  table.getIsSomePageRowsSelected() &&
                  !table.getIsAllPageRowsSelected();
              }
            }}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            aria-label="Select all products"
            className="h-4 w-4 cursor-pointer"
          />
        ),

        cell: ({ row, }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            aria-label={`Select ${row.original.productName}`}
            className="h-4 w-4 cursor-pointer"
          />
        ),
      },

      /* ---------------------------------------------------
         Image
      --------------------------------------------------- */

      {
        accessorKey: "productImage",
        header: "Image",

        cell: ({ row }) => {
          const product = row.original;

          return product.productImage?.url ? (
            <Image
              src={product.productImage.url}
              alt={product.productName}
              width={56}
              height={56}
              className="h-14 w-14 rounded-md object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-md border text-xs text-muted-foreground">
              No image
            </div>
          );
        },
      },

      /* ---------------------------------------------------
         Product
      --------------------------------------------------- */

      {
        accessorKey: "productName",
        header: "Product",

        cell: ({ row }) => (
          <span className="font-medium">
            {row.original.productName}
          </span>
        ),
      },

      /* ---------------------------------------------------
         Price
      --------------------------------------------------- */

      {
        accessorKey: "productPrice",
        header: "Price",

        cell: ({ row }) =>
          `$${row.original.productPrice}`,
      },

      /* ---------------------------------------------------
         Sizes
      --------------------------------------------------- */

      {
        accessorKey: "productSizes",
        header: "Sizes",

        cell: ({ row }) =>
          row.original.productSizes?.join(", ") ?? "-",
      },

      /* ---------------------------------------------------
         Colors
      --------------------------------------------------- */

      {
        accessorKey: "productColors",
        header: "Colors",

        cell: ({ row }) =>
          row.original.productColors?.join(", ") ?? "-",
      },

      /* ---------------------------------------------------
         Description
      --------------------------------------------------- */

      {
        accessorKey: "productDescription",
        header: "Description",

        cell: ({ row }) => (
          <div className="max-w-[300px] truncate">
            {row.original.productDescription}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => (
          <div className="max-w-[300px] truncate">
            {formatDisplayDate(row.original.createdAt)}
          </div>
        ),

      },
      {
        accessorKey: "updatedAt",
        header: "Updated",
        cell: ({ row }) => (
          <div className="max-w-[300px] truncate">
            {formatDisplayDate(row.original.updatedAt)}
          </div>
        ),

      },

    ],
    []
  );

  /* -------------------------------------------------------
     Table
  ------------------------------------------------------- */

  const table = useTable({
    features,

    data,

    columns,


    getRowId: (row) => row._id,

    enableRowSelection: true,

    /*
     * Multiple products can be selected.
     */
    enableMultiRowSelection: true,

    state: {
      globalFilter,
      rowSelection,
    },

    onGlobalFilterChange: setGlobalFilter,

    onRowSelectionChange: setRowSelection,

    globalFilterFn: "includesString",

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  /* -------------------------------------------------------
     Selected products
  ------------------------------------------------------- */

  const selectedProducts =
    table
      .getSelectedRowModel()
      .rows
      .map((row) => row.original);

  const selectedCount = selectedProducts.length;
  const handleSelectedProduct = () => {
    if (selectedProducts.length !== 1) {
      toast.error("Please select only one product to update.");
      return
    }
    setCurrentProduct(selectedProducts[0]);
    setUpdateDialogOpen(true);

  }

  /* -------------------------------------------------------
     Open delete dialog
  ------------------------------------------------------- */

  const handleDeleteSelected = () => {
    if (selectedCount === 0) {
      return;
    }

    setDeleteDialogOpen(true);
  };

  /* -------------------------------------------------------
     Dialog close
  ------------------------------------------------------- */

  const handleDeleteDialogChange = (
    open: boolean
  ) => {
    setDeleteDialogOpen(open);

    if (!open) {
      /*
       * Don't immediately clear selection here.
       *
       * If user simply closes the dialog, selected rows
       * should remain selected.
       */
    }
  };

  /* -------------------------------------------------------
     After successful deletion
  ------------------------------------------------------- */

  const handleDeleted = () => {
    setRowSelection({});
    setDeleteDialogOpen(false);
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* -------------------------------------------------
          Toolbar
      ------------------------------------------------- */}

      <div className="flex items-center justify-between gap-4">
        <Input
          value={globalFilter}
          onChange={(event) => {
            setGlobalFilter(event.target.value);
          }}
          placeholder="Filter products..."
          className="max-w-sm"
        />

        {/* -----------------------------------------------
            Delete Selected

            This button ONLY appears when one or more
            products are selected.
        ------------------------------------------------ */}

        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            {selectedCount === 1 && (
              <Button
                variant="secondary"
                onClick={handleSelectedProduct}
              >
                Update
              </Button>
            )}

            <Button
              variant="destructive"
              onClick={handleDeleteSelected}
            >
              <Trash2 className="mr-2 h-4 w-4" />

              Delete Selected ({selectedCount})
            </Button>
          </div>
        )}
      </div>

      {/* -------------------------------------------------
          Table
      ------------------------------------------------- */}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(
              (headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column
                              .columnDef
                              .header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  )}
                </TableRow>
              )
            )}
          </TableHeader>

          <TableBody>
            {/* Loading */}

            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading products...
                </TableCell>
              </TableRow>
            ) : /* Error */

              isError ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-red-500"
                  >
                    Failed to load products.
                  </TableCell>
                </TableRow>
              ) : /* Products */

                table.getRowModel().rows.length > 0 ? (
                  table
                    .getRowModel()
                    .rows
                    .map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={
                          row.getIsSelected()
                            ? "selected"
                            : undefined
                        }
                      >
                        {row
                          .getVisibleCells()
                          .map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column
                                  .columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                      </TableRow>
                    ))
                ) : (
                  /* Empty */

                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>

      {/* -------------------------------------------------
          Pagination
      ------------------------------------------------- */}

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {table.getFilteredRowModel().rows.length}{" "}
          product(s)

          {selectedCount > 0 && (
            <>
              {" "}
              · {selectedCount} selected
            </>
          )}
        </span>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
            }}
            disabled={
              !table.getCanPreviousPage()
            }
          >
            Previous
          </Button>

          <span>
            Page{" "}
            {table.state.pagination.pageIndex + 1}{" "}
            of{" "}
            {Math.max(
              1,
              table.getPageCount()
            )}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* -------------------------------------------------
          Delete Dialog
      ------------------------------------------------- */}

      <ProductsMultiDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={
          handleDeleteDialogChange
        }
        products={selectedProducts}
        onDeleted={handleDeleted}
      />
      <ProductMutateDrawer
        open={updateDialogOpen}
        onOpenChange={(open) => {
          setUpdateDialogOpen(open)
          if (!open) {
            setCurrentProduct(undefined)
          }
        }}
        currentRow={currentProduct}

      />
    </div>
  );
}
