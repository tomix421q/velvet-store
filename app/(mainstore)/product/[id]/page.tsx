import FeaturedProducts from '@/components/store/FeaturedProducts'
import ImageSlider from '@/components/store/ImageSlider'
import prisma from '@/utills/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { StarIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { AddToCart } from '@/components/store/AddToCart'

const getData = async (productId: string) => {
  const data = prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      id: true,
      name: true,
    },
  })
  if (!data) {
    return notFound()
  }
  return data
}

const ProductIdPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const data = await getData(id)
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-10'>
        <ImageSlider images={data!.images} />
        <div>
          <h1 className='text-3xl font-extrabold tracking-tight text-white'>
            {data!.name.charAt(0).toUpperCase() + data!.name.slice(1)}
          </h1>
          <p className='text-3xl mt-2 text-gray-900 !text-primary'>{data!.price} €</p>
          <div className='mt-3 flex items-center gap-1'>
            <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
            <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
            <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
            <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
            <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
          </div>
          <p className='text-base text-secondary mt-10'>{data?.description}</p>

          <AddToCart userId={user?.id} productData={data as unknown} />
        </div>
      </div>

      <div className='mt-20'>
        <FeaturedProducts />
      </div>
    </>
  )
}
export default ProductIdPage
