import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'

type UserTypes = {
  email: string
  name: string
  userImage: string
}

const UserDropdown = ({ email, name, userImage }: UserTypes) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='relative size-10 rounded-full '>
          <Avatar className='size-10'>
            <AvatarImage src={userImage} alt='User Image' />
            <AvatarFallback className='text-xl bg-transparent'>{name.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='flex flex-col space-y-1'>
          <p className='text-sm font-medium leading-none'>{name}</p>
          <p className='text-xs leading-none text-muted-foreground'>{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={'/orders'} className='cursor-pointer'>Your orders</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutLink>Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserDropdown
