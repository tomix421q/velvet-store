import BannerIndexDIalog from '@/components/admin/BannerIndexDIalog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import prisma from '@/utills/db'
import { HelpCircle, Menu, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const getDate = async () => {
  const data = await prisma.banner.findMany({
    orderBy: {
      index: 'asc',
    },
  })
  return data
}

const BannerPage = async () => {
  const data = await getDate()

  const maxIndex = Math.max(...data.map((item) => item.index))

  return (
    <>
      <div className='flex items-center justify-end mb-10 gap-x-10'>
        <Button className='flex gap-x-2' asChild>
          <Link href={'/admin/banner/create'}>
            <PlusCircle size={15} />
            <span>Add Banner</span>
          </Link>
        </Button>
      </div>

      {/*  */}
      <Card>
        <CardHeader>
          <CardTitle>Banners</CardTitle>
          <CardDescription>Manage your banners</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='flex items-center gap-x-2'>
                  Index <HelpInfo />
                </TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className='text-end'>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className='w-[100px]'>
                    <p className='bg-primary rounded-full size-8 flex items-center justify-center'>{item.index}</p>
                  </TableCell>

                  <TableCell>
                    <Image width={60} height={60} src={item.imageString} alt='Product Image' className='object-cover size-16' />
                  </TableCell>
                  <TableCell className='font-medium'>{item.title}</TableCell>
                  <TableCell className='text-end'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size={'icon'} variant={'ghost'}>
                          <Menu className='!size-8' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align={'end'}>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/banner/${item.id}/delete`} className='cursor-pointer'>
                            Delete
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <BannerIndexDIalog bannerIndex={item.index} maxIndex={maxIndex} bannerId = {item.id} />
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
export default BannerPage

const HelpInfo = () => {
  return (
    <div className='relative group'>
      <HelpCircle className='w-4 h-4 text-gray-500 cursor-help' />
      <div className='invisible group-hover:visible absolute z-10 bg-secondary text-white p-1 rounded text-xs min-w-[70px] flex justify-center'>
        1 is first
      </div>
    </div>
  )
}
