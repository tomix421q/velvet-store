'use client'
import { ShoppingBagIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import UserDropdown from './UserDropdown'
import { Button } from '../ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { cartStorage } from '@/utills/cartStorage'
import { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

const BagNavbar = ({ user }: { user: any }) => {
  const [total, setTotal] = useState(0)
  const userId = user?.id ? user.id : null

  useEffect(() => {
    const cartLS = cartStorage.get(userId)
    const totalItems = cartLS?.items.reduce((sum, item) => sum + item.quantity, 0) || 0
    setTotal(totalItems)
  }, [userId])

  return (
    <div className='flex items-center'>
      {user ? (
        <>
          <Link href={'/bag'} className='group p-2 flex items-center mr-2'>
            <ShoppingBagIcon className='size-6 text-gray-400 group-hover:text-gray-500' />
          </Link>
          <UserDropdown
            email={user.email as string}
            name={user.given_name as string}
            userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
          />
        </>
      ) : (
        <div className='flex items-center justify-end md:space-x-2'>
          <div className={`hidden sm:flex`}>
            <Button asChild variant={'ghost'}>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <span className='h-6 w-px bg-gray-200 my-auto'></span>
            <Button asChild variant={'ghost'}>
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>

          {/* mobile icons  */}
          <div className='flex sm:hidden'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='cursor-pointer'>
                <Button size={'icon'} variant={'ghost'}>
                  <UserIcon className='!size-8' />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className='bg-black p-2 rounded-xl z-20' align='end' forceMount>
                <DropdownMenuItem asChild>
                  <LoginLink>Login</LoginLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <RegisterLink>Create Account</RegisterLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  )
}
export default BagNavbar
