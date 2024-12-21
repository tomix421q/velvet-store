'use client'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const navbarLinks = [
  { id: 0, name: 'Home', href: '/' },
  { id: 1, name: 'All Products', href: '/products/all' },
]

const NavbarLinks = () => {
  const location = usePathname()

  return (
    <div className='flex flex-col lg:flex-row justify-start items-start gap-x-2 ml-8 text-2xl md:text-xl'>
      {navbarLinks.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className={cn(
            location === item.href ? 'bg-muted' : 'hover:bg-muted hover:bg-opacity-75',
            'p-2 rounded-sm font-medium group'
          )}
        >
          {item.name}
        </a>
      ))}
    </div>
  )
}
export default NavbarLinks
