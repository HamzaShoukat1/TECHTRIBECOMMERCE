'use client'

import { useMemo, useState } from 'react'
import { Button } from '@admin/components/ui/button'
import { Input } from '@admin/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@admin/components/ui/table'
import type { User } from '../data/schema'

export function UsersTable({
  data,
  isLoading,
  isError,
}: {
  data: User[]
  isLoading?: boolean
  isError?: boolean
}) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10

  const filtered = useMemo(
    () =>
      data.filter((user) =>
        `${user.firstName} ${user.lastName} ${user.email} ${user.username ?? ''}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [data, query]
  )

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <Input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setPage(1)
        }}
        placeholder='Filter users...'
        className='max-w-sm'
      />

      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead>Role</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center'>Loading users...</TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center text-red-500'>Failed to load users.</TableCell>
              </TableRow>
            ) : rows.length ? (
              rows.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className='font-medium'>
                    {user.firstName} {user.lastName}
                    <div className='text-xs text-muted-foreground'>@{user.username ?? user.email}</div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  {/* <TableCell>
                    <Badge variant='outline' className='capitalize'>{user.status}</Badge>
                  </TableCell> */}
                  <TableCell className='capitalize'>{user.role}</TableCell>
                  <TableCell>{user.createdAt.toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center'>No users found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between text-sm text-muted-foreground'>
        <span>{filtered.length} user(s)</span>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1}>
            Previous
          </Button>
          <span>
            Page {page} of {pageCount}
          </span>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            disabled={page === pageCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
