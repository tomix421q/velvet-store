'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface iImagesProps {
  images: string[]
}

const ImageSlider = ({ images }: iImagesProps) => {
  const [mainImageIndex, setMainImageIndex] = useState(0)

  const handlePreviousClick = () => {
    setMainImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleNextClick = () => {
    setMainImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const handleImageClick = (index: number) => {
    setMainImageIndex(index)
  }

  return (
    <div className='grid gap-6 md:gap-3 items-start border border-secondary/20 p-4 rounded-lg z-10'>
      <div className='relative overflow-hidden rounded-lg'>
        <Image src={images[mainImageIndex]} alt={'Product image'} width={900} height={900} priority className='object-cover ' />

        <div className='absolute inset-0 flex items-center justify-between px-4'>
          <Button onClick={handlePreviousClick} variant={'ghost'} size={'icon'}>
            <ChevronLeft />
          </Button>
          <Button onClick={handleNextClick} variant={'ghost'} size={'icon'}>
            <ChevronRight className='size-6' />
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-5 gap-4'>
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            className={cn(
              index === mainImageIndex ? 'border-2 border-primary' : 'border-gray-200',
              'relative overflow-hidden rounded-lg cursor-pointer'
            )}
          >
            <Image src={image} alt={'product image'} width={100} height={100} priority className='object-cover ' />
          </div>
        ))}
      </div>
    </div>
  )
}
export default ImageSlider
