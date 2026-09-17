
import Link from 'next/link'
import useDialogState from '@admin/hooks/use-dialog-state'
import { Avatar, AvatarFallback, AvatarImage } from '@admin/components/ui/avatar'
import { Button } from '@admin/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@admin/components/ui/dropdown-menu'
import { SignOutDialog } from '@admin/components/sign-out-dialog'
import { UseLogout } from '../hooks/Use-Logout'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '@/src/app/services/user.service'

export function ProfileDropdown() {
  const [open, setOpen] = useDialogState()

    const { data: user, isLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false,
    })

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='/avatars/01.png' alt='@shadcn' />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col gap-1.5'>
              <p className='text-sm leading-none font-medium'>satnaing</p>
              <p className='text-xs leading-none text-muted-foreground'>
                {/* satnaingdev@gmail.com */}
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
        
            
           
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant='destructive' onClick={() => setOpen(true)}>
            Sign out
            <DropdownMenuShortcut className='text-current'>
              ⇧⌘Q
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignOutDialog open={!!open} onOpenChange={setOpen} />
    </>
  )
}
