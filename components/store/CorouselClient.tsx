'use client'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useState } from 'react'

export type bannerProps = {
  id: string
  title: string
  imageString: string
  index: number
  createdAt: Date
}

const CorouselClient = ({ banner }: { banner: bannerProps[] }) => {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <div>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent>
          {banner.map((item) => (
            <CarouselItem key={item.id}>
              <div className='relative h-[30vh] lg:h-[40vh] rounded-xl'>
                <Image
                  src={item.imageString}
                  alt={'Banner image'}
                  fill
                  priority
                  sizes='(max-width: 1868px) 100vw, (max-width: 500px) 100vw, 100vw'
                  className='object-cover w-full h-full rounded-xl'
                />
                <div className='absolute top-6 left-12 p-4  bg-opacity-80 bg-black text-white  transition-transform hover:scale-105 cursor-pointer  max-w-3xl ring-2 ring-primary shadow-2xl shadow-secondary rounded-e-2xl font-[sourcepro] '>
                  <h1
                    className='text-2xl lg:text-3xl text-primary font-light
                  '
                  >
                    {item.title}
                  </h1>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='ml-16' />
        <CarouselNext className='mr-16' />
      </Carousel>
    </div>
  )
}
export default CorouselClient
