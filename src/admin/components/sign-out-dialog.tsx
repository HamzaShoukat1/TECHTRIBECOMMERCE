import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@admin/stores/auth-store'
import { ConfirmDialog } from '@admin/components/confirm-dialog'
import { useLogout, UseLogout } from '../hooks/Use-Logout'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logoutUser } from '@/src/app/services/product.service'
import { toast } from 'sonner'

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const { logout } = useLogout();
  // const queryClient = useQueryClient()
  // // const { mutateAsync: logout } = UseLogout()
  //    const { mutate: Logout } = useMutation({
  //       mutationFn: logoutUser,
  //       onSuccess: () => {
  //           toast.success("Logged out successfully.")
  //           queryClient.setQueryData(["currentUser"], null)
  //           router.push("/login")
  //       },
  //       onError: () => {
  //           toast.error("Logout failed. Please try again.")
  //       }
  //   })

  const router = useRouter()
  const pathname = usePathname()
  const { auth } = useAuthStore()


  const handleSignOut = () => {
    auth.reset()
    // Preserve current location for redirect after sign-in
    logout()
    // router.replace(`/admin/sign-in?redirect=${encodeURIComponent(pathname)}`)

  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Sign out'
      desc='Are you sure you want to sign out? You will need to sign in again to access your account.'
      confirmText='Sign out'
      destructive
      handleConfirm={handleSignOut}
      className='sm:max-w-sm'
    />
  )
}
