'use client'

import { useMemo, useState } from 'react'
import { Badge } from '@admin/components/ui/badge'
import { Button } from '@admin/components/ui/button'
import { Checkbox } from '@admin/components/ui/checkbox'
import { Input } from '@admin/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@admin/components/ui/table'

import type { Order } from '../data/schema'
import { formatDisplayDate } from '@/src/app/utils'
import { useChangeOrderStatus } from '@/src/admin/hooks/use-all-Order'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
const statuses = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
]


function getStatusVariant(status: string) {
  switch (status) {
    case 'PENDING':
      return 'default'
    case 'SHIPPED':
      return 'secondary'
    case 'DELIVERED':
      return 'destructive'
    default:
      return 'secondary'
  }
}

export function OrdersTable({
  data = [],
}: {
  data?: Order[]
}) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const { mutateAsync: ChangedStatus, isPending } = useChangeOrderStatus()

  const pageSize = 10

  const handleStatusChange = async (orderId: string, nextStatus: any) => {
    try {
      await ChangedStatus({ id: orderId, nextStatus })
      toast.success(`status changed to ${nextStatus} successFully`, {
        position: "top-left"
      })
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const filtered = useMemo(() => {
    const search = query.toLowerCase().trim()

    if (!search) {
      return data
    }

    return data.filter((order) => {
      const customerName =
        `${order.customer.firstName} ${order.customer.lastName}`

      return `${order._id} ${customerName} ${order.customer.email} ${order.status}`
        .toLowerCase()
        .includes(search)
    })
  }, [data, query])

  const pageCount = Math.max(
    1,
    Math.ceil(filtered.length / pageSize)
  )

  const rows = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  const toggle = (id: string, checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current)

      if (checked) {
        next.add(id)
      } else {
        next.delete(id)
      }

      return next
    })
  }

  return (
    <div className='flex flex-1 flex-col gap-4'>

      {/* Search */}
      <Input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setPage(1)
        }}
        placeholder='Filter by order ID, customer or email...'
        className='max-w-sm'
      />

      {/* Table */}
      <div className='overflow-hidden rounded-md border'>
        <Table>

          <TableHeader>
            <TableRow>
              <TableHead className='w-12'>
                Select
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length ? (
              rows.map((order) => {
                const customerName =
                  `${order.customer.firstName} ${order.customer.lastName}`

                return (
                  <TableRow
                    key={order._id}
                    data-state={
                      selected.has(order._id)
                        ? 'selected'
                        : undefined
                    }
                  >

                    {/* Checkbox */}
                    <TableCell>
                      <Checkbox
                        checked={selected.has(order._id)}
                        onCheckedChange={(value) =>
                          toggle(
                            order._id,
                            value === true
                          )
                        }
                        aria-label={`Select order ${order._id}`}
                      />
                    </TableCell>

                    {/* Order ID */}
                    <TableCell className='font-mono text-xs'>
                      {order._id}
                    </TableCell>

                    {/* Customer */}
                    <TableCell>
                      <span className='font-medium'>
                        {customerName}
                      </span>
                    </TableCell>

                    {/* Email */}
                    <TableCell>
                      {order.customer.email}
                    </TableCell>

                    {/* Items */}
                    <TableCell>
                      {order.itemCount}
                    </TableCell>

                    {/* Total */}
                    <TableCell className='font-medium'>
                      {order.currency}{' '}
                      {order.subtotal.toFixed(2)}
                    </TableCell>

                    {/* Status Select Dropdown */}
                    <TableCell className=''>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Badge
                          variant={
                            getStatusVariant(order.status)
                          }
                        >
                          {order.status}
                        </Badge>

                        <select
                          value={order.status}
                          disabled={isPending}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}

                          className="rounded-md border border-input bg-background  cursor-pointer px-2 py-1 text-xs font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {statuses.map((status) => (
                            <option className='cursor-pointer' key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </TableCell>

                    {/* Date */}
                    <TableCell>
                      {formatDisplayDate(order.createdAt)}
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className='h-24 text-center'
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between text-sm text-muted-foreground'>

        <span>
          {selected.size} selected of {filtered.length}{' '}
          order(s)
        </span>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              setPage((value) =>
                Math.max(1, value - 1)
              )
            }
            disabled={page === 1}
          >
            Previous
          </Button>

          <span>
            Page {page} of {pageCount}
          </span>

          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              setPage((value) =>
                Math.min(pageCount, value + 1)
              )
            }
            disabled={page === pageCount}
          >
            Next
          </Button>
        </div>
      </div>

    </div>
  )
}
