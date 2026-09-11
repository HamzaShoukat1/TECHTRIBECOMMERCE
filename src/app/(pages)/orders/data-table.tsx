"use client";

import { useState } from "react";
import {
    type ColumnDef,
    flexRender,
    stockFeatures,
    useTable,
    type RowSelectionState,
    type SortingState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";
import { DataTablePagination } from "../../Components/TablePagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onDeleteSelected?: (selectedRows: TData[]) => void;
    emptyText?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data = [],
    onDeleteSelected,
    emptyText = "No orders found.",
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const table = useTable({
        features: stockFeatures,
        columns,
        data,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
        },
    });

    const selectedRows = table.getFilteredSelectedRowModel().rows;

    const handleDelete = () => {
        if (onDeleteSelected) {
            onDeleteSelected(selectedRows.map((row) => row.original));
            setRowSelection({});
        }
    };

    return (
        <div className="space-y-4">
            {selectedRows.length > 0 && (
                <div className="flex items-center justify-between rounded-lg border bg-muted/40 p-3">
                    <span className="text-sm font-medium text-muted-foreground">
                        {selectedRows.length} order(s) selected
                    </span>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        className="gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete Selected
                    </Button>
                </div>
            )}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="h-auto px-6 py-4"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="px-6 py-4">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    {emptyText}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination table={table} />
        </div>
    );
}