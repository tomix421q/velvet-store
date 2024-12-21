import AdminNavigation from '@/components/admin/AdminNavigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server'
import { CircleUser, MenuIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { checkUserPermission } from '../actions'
import { unstable_noStore as noStore } from 'next/cache'

const getData = async () => {
  const data = await checkUserPermission()
  return data
}

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  noStore()
  const data = await getData()

  return (
    <div className='flex w-full flex-col max-w-7xl mx-auto '>
      <header className='sticky top-0 flex h-20 items-center justify-between gap-4  bg-gradient-to-b from-secondary to-background  px-4 z-20 '>
        {/* DESKTOP */}
        <nav className='hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
          <AdminNavigation />
        </nav>
        {/* MOBILE */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className='md:hidden' variant={'outline'} size={'icon'}>
              <MenuIcon className='!size-6' />
            </Button>
          </SheetTrigger>
          <SheetContent side={'left'}>
            <SheetTitle className='mb-6'>Menu</SheetTitle>
            <Separator />
            <nav className='grid gap-6 text-lg font-medium mt-10'>
              <AdminNavigation />
            </nav>
          </SheetContent>
        </Sheet>
        {/*  */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'secondary'} size={'icon'}>
              <CircleUser className='!size-6' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel className='text-secondary font-light'>My account</DropdownMenuLabel>
            <DropdownMenuLabel className='text-primary'>{data?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <LogoutLink className='cursor-pointer'>Logout</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      {/*  */}
      <main className='my-5 px-4 sm:px-6 lg:px-8'>{children}</main>
    </div>
  )
}
export default AdminLayout
