import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import prisma from '@/utills/db'
import { MoreHorizontal, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const getData = async () => {
  const data = prisma.product.findMany({
    orderBy: {
      createAt: 'desc',
    },
  })
  return data
}

const ProductsPage = async () => {
  const data = await getData()

  return (
    <>
      <div className='flex items-center justify-end'>
        <Button asChild>
          <Link href={'/admin/products/create'} className='flex items-center gap-x-2'>
            <PlusCircle className='!size-6' />
            <p>Add product</p>
          </Link>
        </Button>
      </div>
      {/*  */}
      <Card className='mt-5'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Products</CardTitle>
          <CardDescription>Manage your products and view their sales performance.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className='text-end'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.images[0]}
                      alt={'Product image'}
                      width={60}
                      height={60}
                      className='w-20 h-20 rounded-md object-cover'
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.price} €</TableCell>
                  <TableCell>{new Intl.DateTimeFormat('en-EU').format(item.createAt)}</TableCell>
                  <TableCell className='text-end'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size={'icon'} variant={'ghost'}>
                          <MoreHorizontal className='!size-8' />
                        </Button>
                      </DropdownMenuTrigger>
                      {/*  */}
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className='cursor-pointer'>
                          <Link href={`/admin/products/${item.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className='cursor-pointer'>
                          <Link href={`/admin/products/${item.id}/delete`}>Delete</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className='cursor-pointer'>
                          <Link href={`/products/${item.id}`} target='_blank' rel='noopener noreferrer'>
                            Check Product
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
export default ProductsPage
