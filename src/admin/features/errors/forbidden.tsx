'use client'

import { Button } from '../../components/ui/button'
import { useRouter } from "next/navigation"
import Link from 'next/link' 

export function ForbiddenError() {
  const router = useRouter()

  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>403</h1>
        <span className='font-medium'>Access Forbidden</span>
        <p className='text-center text-muted-foreground'>
          You don't have necessary permission <br />
          to view this resource.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => router.back()}>
            Go Back
          </Button>
          
          <Button asChild>
            <Link href='/'>Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
