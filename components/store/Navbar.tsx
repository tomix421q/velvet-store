import { checkUser } from '@/app/actions'
import BagNavbar from './BagNavbar'
import Link from 'next/link'
import NavbarLinks from './NavbarLinks'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import { Separator } from '../ui/separator'
import { categories } from '@/utills/categories'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

const Navbar = async () => {
  const user = await checkUser()

  return (
    <nav className='w-full max-w-7xl mx-auto px-2 md:px-4 py-5 flex items-center justify-between'>
      {/* Desktop */}
      <div className='hidden lg:flex items-center'>
        <Link href={'/'}>
          <h1 className='text-white font-medium text-xl lg:text-3xl'>
            Velvet <span className='text-primary -ml-2'>Store</span>
          </h1>
        </Link>
        <NavbarLinks />
        <DropdownMenu>
          <DropdownMenuTrigger
            className='hover:bg-muted hover:bg-opacity-75
            p-2 rounded-sm font-medium text-2xl md:text-xl ml-2 flex items-center gap-x-2'
          >
            Categories
          </DropdownMenuTrigger>
          <DropdownMenuContent className='flex flex-col gap-y-2' align='start'>
            {categories.map((category) => (
              <DropdownMenuItem asChild key={category.id}>
                <Link
                  href={`/products/${category.name}`}
                  className='hover:bg-muted hover:bg-opacity-75
                    p-2 rounded-sm cursor-pointer px-4 font-[source pro] font-semibold uppercase'
                >
                  {category.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile */}
      <div className='lg:hidden flex items-center'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={'outline'} size={'icon'}>
              <MenuIcon className='!size-6' />
            </Button>
          </SheetTrigger>
          <SheetContent side={'left'}>
            <SheetTitle className='mb-6'>Menu</SheetTitle>
            <SheetDescription className='sr-only'>Navigačné menu stránky</SheetDescription>

            <Separator />

            <nav className='grid gap-6 text-lg font-medium mt-2'>
              <NavbarLinks />
              <Separator />

              {/* Category nav  */}
              <nav className='flex flex-col text-sm gap-y-2'>
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/products/${category.name}`}
                    className='hover:bg-muted hover:bg-opacity-75
                    p-2 rounded-sm cursor-pointer px-4 font-[source pro] font-semibold uppercase'
                  >
                    {category.title}
                  </a>
                ))}
              </nav>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href={'/'}>
          <h1 className='text-white font-medium text-xl lg:text-3xl ml-1'>
            Velvet <span className='text-primary -ml-2'>Store</span>
          </h1>
        </Link>
      </div>

      {/* User Bag shoping ocon */}
      <BagNavbar user={user} />
    </nav>
  )
}
export default Navbar
