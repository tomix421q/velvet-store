import ProductCart from '@/components/store/ProductCart'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { categories } from '@/utills/categories'
import prisma from '@/utills/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const getData = async (productCategory: string) => {
  switch (productCategory) {
    case 'all': {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          status: 'published',
        },
      })
      return { title: 'All Products', data: data }
    }
    case 'velvet_calm': {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          status: 'published',
        },
      })
      return { title: 'velvet calm', data: data }
    }
    case 'velvet_calm': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'velvet_calm',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      })
      return { title: 'velvet calm', data: data }
    }
    case 'velvet_comfort': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'velvet_comfort',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      })
      return { title: 'velvet comfort', data: data }
    }
    case 'velvet_glow': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'velvet_glow',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      })
      return { title: 'velvet glow', data: data }
    }
    case 'velvet_aura': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'velvet_aura',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      })
      return { title: 'velvet aura', data: data }
    }
    case 'velvet_bloom': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'velvet_bloom',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      })
      return { title: 'velvet bloom', data: data }
    }
    case 'velvet_essence': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'velvet_essence',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      })
      return { title: 'velvet essence', data: data }
    }
    case 'velvet_other': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'velvet_other',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      })
      return { title: 'velvet other', data: data }
    }
    default: {
      return notFound()
    }
  }
}

const CategoriesPage = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params
  const { data, title } = await getData(name)

  return (
    <>
      <section>
        <div className='flex justify-between'>
          <h1 className='font-semibold md:text-3xl my-5 tracking-widest uppercase text-secondary'>
            {title ? title : 'No products'}
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger
              className='hover:bg-muted hover:bg-opacity-75
            p-2 font-medium text-sm md:text-sm ml-2 flex items-center gap-x-2'
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
        <Separator />

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
          {data.length > 0 ? (
            data.map((item) => <ProductCart item={item} key={item.id} />)
          ) : (
            <div className='flex w-full items-center justify-center text-3xl font-[sourcepro]'>This category is empty sorry.</div>
          )}
        </div>
      </section>
    </>
  )
}
export default CategoriesPage
