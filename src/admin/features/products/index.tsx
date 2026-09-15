'use client'

import { ConfigDrawer } from '@admin/components/config-drawer'
import { Header } from '@admin/components/layout/header'
import { Main } from '@admin/components/layout/main'
import { ProfileDropdown } from '@admin/components/profile-dropdown'
import { Search } from '@admin/components/search'
import { ThemeSwitch } from '@admin/components/theme-switch'


import { ProductDialogs } from './components/Product-dialogs'
import { TasksPrimaryButtons } from './components/Products-primary-buttons'
import { TasksProvider } from './components/tasks-provider'
import { ProductsTable } from './components/Products-table'
import { useAllProductsForamdin } from '../../hooks/useAllProducts'

export function Products() {
  const {
    data = [],
    isLoading,
    isError,
  } = useAllProductsForamdin()

  console.log("sa", data)
  

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
            <h2 className='text-2xl font-bold tracking-tight'>
              Products
            </h2>

            <p className='text-muted-foreground'>
              Manage your products and inventory here.
            </p>
          </div>

          <TasksPrimaryButtons />
        </div>

        <ProductsTable
          data={data}
          isLoading={isLoading}
          isError={isError}
        />
      </Main>

      <ProductDialogs />
    </TasksProvider>
  )
}
