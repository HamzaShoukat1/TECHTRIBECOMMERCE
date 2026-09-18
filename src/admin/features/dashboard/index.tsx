import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@admin/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@admin/components/ui/tabs'
import { ConfigDrawer } from '@admin/components/config-drawer'
import { Header } from '@admin/components/layout/header'
import { Main } from '@admin/components/layout/main'
import { ProfileDropdown } from '@admin/components/profile-dropdown'
import { Search } from '@admin/components/search'
import { ThemeSwitch } from '@admin/components/theme-switch'
import { Analytics } from './components/analytics'
import { Overview } from './components/overview'
import { RecentOrders } from './components/recent-sales'
import { useDashboardStats } from '../../hooks/Use-All-Stats'

export function Dashboard() {
  const { data, isLoading } = useDashboardStats()
  const details = data

  const totalRevenue = details?.totalRevenue ?? 0
  const totalOrders = details?.totalOrders ?? 0
  const totalProducts = details?.totalProducts ?? 0
  const totalCustomers = details?.totalCustomers ?? 0

  return (
    <>
      <Header>
        <div className="flex w-full items-center justify-end gap-2">
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        </div>

        <Tabs defaultValue='overview' className='space-y-4'>
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='overview' className='space-y-4'>
            {/* Stat Cards Grid */}
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {/* Total Revenue */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='h-4 w-4 text-muted-foreground'>
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {isLoading ? '...' : `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  </div>
                  <p className='text-xs text-muted-foreground'>Total earnings to date</p>
                </CardContent>
              </Card>

              {/* Total Orders */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Orders</CardTitle>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='h-4 w-4 text-muted-foreground'>
                    <path d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 2-2m-2 2a2 2 0 1 1-2-2m-6 0a2 2 0 1 0-2-2m2 2a2 2 0 1 1-2-2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {isLoading ? '...' : totalOrders.toLocaleString()}
                  </div>
                  <p className='text-xs text-muted-foreground'>Lifetime orders placed</p>
                </CardContent>
              </Card>

              {/* Total Products */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Products</CardTitle>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='h-4 w-4 text-muted-foreground'>
                    <path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' />
                    <polyline points='3.27 6.96 12 12.01 20.73 6.96' />
                    <line x1='12' y1='22.08' x2='12' y2='12' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {isLoading ? '...' : totalProducts.toLocaleString()}
                  </div>
                  <p className='text-xs text-muted-foreground'>Active catalog items</p>
                </CardContent>
              </Card>

              {/* Total Customers */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Customers</CardTitle>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='h-4 w-4 text-muted-foreground'>
                    <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {isLoading ? '...' : totalCustomers.toLocaleString()}
                  </div>
                  <p className='text-xs text-muted-foreground'>Registered accounts</p>
                </CardContent>
              </Card>
            </div>

            {/* Visual Charts & Table section */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='ps-2'>
                  <Overview />
                </CardContent>
              </Card>

              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentOrders />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='analytics' className='space-y-4'>
            <Analytics />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}