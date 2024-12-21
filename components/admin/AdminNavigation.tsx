'use client'
import { cn } from '@/lib/utils'
import { LayoutDashboardIcon, ListOrdered, LucidePictureInPicture2, Store, Tag } from 'lucide-react'
import { usePathname } from 'next/navigation'

const links = [
  { icon: <LayoutDashboardIcon />, name: 'Dashboard', href: '/admin' },
  { icon: <ListOrdered />, name: 'Orders', href: '/admin/orders' },
  { icon: <Tag />, name: 'Products', href: '/admin/products' },
  { icon: <LucidePictureInPicture2 />, name: 'Banner Picture', href: '/admin/banner' },
  { icon: <Store />, name: 'Store', href: '/' },
]

const AdminNavigation = () => {
  const pathname = usePathname()
  return (
    <>
      {links.map((link) => (
        <a
          href={link.href}
          key={link.href}
          className={cn(
            link.href === pathname ? 'text-white ring-2 ring-primary' : 'text-muted-foreground',
            'bg-gray-900 p-2 px-4 rounded-xl shadow-md flex items-center gap-x-2'
          )}
        >
          <span className='size-4 flex items-center'> {link.icon}</span>
          <span> {link.name}</span>
        </a>
      ))}
    </>
  )
}
export default AdminNavigation
