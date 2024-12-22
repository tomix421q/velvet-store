'use client'
import { ShoppingBagIcon } from 'lucide-react'
import Link from 'next/link'
import UserDropdown from './UserDropdown'
import { Button } from '../ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { cartStorage } from '@/utills/cartStorage'
import { useEffect, useState } from 'react'

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
        <div className='hidden sm:flex md:flex-1 md:items-center md:justify-end md:space-x-2'>
          <Button asChild variant={'ghost'}>
            <LoginLink>Sign in</LoginLink>
          </Button>
          <span className='h-6 w-px bg-gray-200'></span>
          <Button asChild variant={'ghost'}>
            <RegisterLink>Create Account</RegisterLink>
          </Button>
        </div>
      )}
    </div>
  )
}
export default BagNavbar
