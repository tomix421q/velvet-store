import { Suspense } from 'react'
import ProductCart, { LoadingProductCard } from './ProductCart'
import prisma from '@/utills/db'

const getData = async () => {
  const data = await prisma.product.findMany({
    where: {
      status: 'published',
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      price: true,
    },
    orderBy: {
      createAt: 'desc',
    },
    take: 6,
  })
  return data
}

const FeaturedProducts = () => {
  return (
    <>
      <h2 className='text-2xl font-extrabold tracking-tighter'>Featured Products</h2>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeaturedProducts />
      </Suspense>
    </>
  )
}
export default FeaturedProducts

const LoadFeaturedProducts = async () => {
  const data = await getData()

  return (
    <div className='mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 gap-x-20'>
      {data.map((item) => (
        <ProductCart key={item.id} item={item} />
      ))}
    </div>
  )
}

const LoadingRows = () => {
  return (
    <div className='mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  )
}
