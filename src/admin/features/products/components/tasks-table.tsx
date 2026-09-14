'use client'

import { useMemo, useState } from 'react'
import { CheckCircle, Circle, CircleOff, HelpCircle, Timer } from 'lucide-react'
import { Badge } from '@admin/components/ui/badge'
import { Button } from '@admin/components/ui/button'
import { Checkbox } from '@admin/components/ui/checkbox'
import { Input } from '@admin/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@admin/components/ui/table'
import type { Task } from '../data/schema'

const statuses = [
  { value: 'backlog', label: 'Backlog', icon: HelpCircle },
  { value: 'todo', label: 'Todo', icon: Circle },
  { value: 'in progress', label: 'In Progress', icon: Timer },
  { value: 'done', label: 'Done', icon: CheckCircle },
  { value: 'canceled', label: 'Canceled', icon: CircleOff },
]

const tasks: Task[] = Array.from({ length: 24 }, (_, index) => ({
  id: `TASK-${String(index + 1001)}`,
  title: `Project task ${index + 1}`,
  status: statuses[index % statuses.length].value,
  label: ['bug', 'feature', 'documentation'][index % 3],
  priority: ['low', 'medium', 'high'][index % 3],
}))

export function TasksTable({ data = tasks }: { data?: Task[] }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const pageSize = 10
  const filtered = useMemo(() => data.filter((task) => `${task.id} ${task.title}`.toLowerCase().includes(query.toLowerCase())), [data, query])
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize)
  const toggle = (id: string, checked: boolean) => setSelected((current) => { const next = new Set(current); checked ? next.add(id) : next.delete(id); return next })

  return <div className='flex flex-1 flex-col gap-4'>
    <Input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder='Filter by title or ID...' className='max-w-sm' />
    <div className='overflow-hidden rounded-md border'>
      <Table>
        <TableHeader><TableRow><TableHead className='w-12'>Select</TableHead><TableHead>Task</TableHead><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead>Priority</TableHead></TableRow></TableHeader>
        <TableBody>{rows.length ? rows.map((task) => { const status = statuses.find((item) => item.value === task.status); const Icon = status?.icon; return <TableRow key={task.id} data-state={selected.has(task.id) ? 'selected' : undefined}><TableCell><Checkbox checked={selected.has(task.id)} onCheckedChange={(value) => toggle(task.id, value === true)} aria-label={`Select ${task.id}`} /></TableCell><TableCell className='font-mono text-xs'>{task.id}</TableCell><TableCell><div className='flex items-center gap-2'><Badge variant='outline'>{task.label}</Badge><span className='font-medium'>{task.title}</span></div></TableCell><TableCell><div className='flex items-center gap-2'>{Icon && <Icon className='size-4 text-muted-foreground' />}{status?.label}</div></TableCell><TableCell className='capitalize'>{task.priority}</TableCell></TableRow> }) : <TableRow><TableCell colSpan={5} className='h-24 text-center'>No results.</TableCell></TableRow>}</TableBody>
      </Table>
    </div>
    <div className='flex items-center justify-between text-sm text-muted-foreground'><span>{selected.size} selected of {filtered.length} task(s)</span><div className='flex items-center gap-2'><Button variant='outline' size='sm' onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1}>Previous</Button><span>Page {page} of {pageCount}</span><Button variant='outline' size='sm' onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={page === pageCount}>Next</Button></div></div>
  </div>
}
