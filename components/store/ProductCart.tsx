import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'
import Link from 'next/link'

interface iCartProps {
  id: string
  name: string
  description: string
  price: number
  images: string[]
}

const ProductCart = ({ item }: { item: iCartProps }) => {
  return (
    <div className='rounded-lg'>
      <Carousel>
        <CarouselContent>
          {item.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className='relative min-h-[200px] md:h-[330px]'>
                <Image
                  src={item}
                  alt='Product image'
                  fill
                  priority
                  sizes='max-w-[100vw]'
                  className='object-cover w-full h-full rounded-md'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='ml-14 cursor-pointer bg-opacity-50' />
        <CarouselNext className='mr-14 cursor-pointer bg-opacity-50' />
      </Carousel>

      <div className='flex justify-between items-center mt-2'>
        <h1 className='font-semibold text-xl'>{item.name}</h1>
        <h3 className='inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20'>
          {item.price} €
        </h3>
      </div>
      <p className='text-gray-600 text-sm mt-2 line-clamp-2 min-h-[40px]'>{item.description}</p>

      <Button className='w-full mt-2' asChild>
        <Link href={`/product/${item.id}`}>Learn More</Link>
      </Button>
    </div>
  )
}
export default ProductCart

export const LoadingProductCard = () => {
  return (
    <div className='flex flex-col'>
      <Skeleton className='w-full h-[330px]' />
      <div className='flex flex-col mt-2 gap-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='w-full h-6' />
      </div>
      <Skeleton className='w-full h-10 mt-5' />
    </div>
  )
}
