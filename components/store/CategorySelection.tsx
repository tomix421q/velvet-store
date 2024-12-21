import { ArrowRight } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import AllProducts from '@/public/CategoryPhotos/AllProducts.jpg'
import VelvetCalm from '@/public/CategoryPhotos/VelvetCalm.webp'
import VelvetComfy from '@/public/CategoryPhotos/comfort.avif'
import VelvetGlow from '@/public/CategoryPhotos/glow.webp'
import VelvetAura from '@/public/CategoryPhotos/aura.png'
import VelvetBloom from '@/public/CategoryPhotos/bloom.jpeg'
import VelvetEssence from '@/public/CategoryPhotos/essence.jpg'
import bgPatern from '@/public/CategoryPhotos/patern.png'
import { categories } from '@/utills/categories'

const CategorySelection = () => {
  return (
    <div className='py-24 sm:py-36'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-extrabold tracking-tight'>Category</h2>
        <Link
          href={'/products/all'}
          className='text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-x-3'
        >
          Browse All Products
          <span>
            <ArrowRight size={15} />
          </span>
        </Link>
      </div>

      {/*  */}
      <section className='mt-6 flex flex-col md:grid md:grid-cols-2  gap-4 font-[sourcepro] '>
        <div className='grid gap-4 '>
          {/*  */}
          {/* All Products */}
          <Link
            href={'/products/all'}
            className='group h-[150px] md:h-[300px] flex items-center justify-center rounded-xl overflow-hidden relative'
          >
            <Image
              src={AllProducts}
              fill
              sizes='w-[100vw]'
              alt={'All products image'}
              className='object-cover object-center absolute -z-10'
            />

            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-500/50 group-hover:opacity-90 transition-opacity duration-300'></div>
            <div
              className='p-2 md:p-4 absolute bottom-2 left-2 bg-gray-900 rounded-xl w-fit group-hover:border-primary border-2
               transition-all ease-out duration-1000'
            >
              <h3 className='md:text-3xl'>All Products</h3>
              <div className='text-primary flex items-center text-sm md:text-xl gap-x-2'>
                <span> Shop Now</span>
                <span className=''>
                  <ArrowRight size={20} />
                </span>
              </div>
            </div>
          </Link>
          {/*  */}
          {/* Velvet Calm */}
          <Link
            href={'/products/velvet-calm'}
            className='group h-[150px] md:h-[300px] flex items-center justify-center rounded-xl overflow-hidden relative '
          >
            <Image src={VelvetCalm} sizes='w-[100vw]' fill alt={'All products image'} className='object-cover h-full' />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-500/50 group-hover:opacity-90 transition-opacity duration-300'></div>
            <div
              className='p-2 md:p-4 absolute bottom-2 left-2 bg-gray-900/95 rounded-xl w-fit group-hover:border-primary border-2
               transition-all ease-out duration-1000'
            >
              <h3 className='md:text-3xl'>Velvet Calm</h3>
              <div className='text-primary flex items-center text-sm md:text-xl gap-x-2'>
                <span> Shop Now</span>
                <span className=''>
                  <ArrowRight size={20} />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/*  */}
        {/*  */}
        {/* Other Products */}
        <div className='items-center rounded-xl flex flex-col justify-between gap-y-4 '>
          {categories.map((category) => {
            let categoryImage: StaticImageData | null = VelvetComfy
            if (category.name === 'velvet_calm') return null

            const test = () => {
              switch (category.name) {
                case 'velvet_comfort':
                  return (categoryImage = VelvetComfy as StaticImageData)
                case 'velvet_glow':
                  return (categoryImage = VelvetGlow as StaticImageData)
                case 'velvet_aura':
                  return (categoryImage = VelvetAura as StaticImageData)
                case 'velvet_bloom':
                  return (categoryImage = VelvetBloom as StaticImageData)
                case 'velvet_essence':
                  return (categoryImage = VelvetEssence as StaticImageData)
                default:
                  return (categoryImage = bgPatern as StaticImageData)
              }
            }
            test()

            return (
              <Link
                href={`/products/${category.name}`}
                key={category.id}
                className='flex justify-center items-center w-full h-[50px] md:h-[90px] border-b relative overflow-hidden rounded-xl group '
              >
                <Image
                  src={categoryImage}
                  alt={'Other products patern'}
                  className='object-cover object-right absolute -z-10'
                  fill
                  sizes='w-[100vw]'
                />

                <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-500/50 group-hover:opacity-90 transition-opacity duration-300'></div>
                <h3 className='md:text-2xl absolute bottom-2 left-4  bg-gray-900 p-1 px-2 rounded-xl group-hover:border-primary border-2 transition-all duration-500 ease-out'>
                  {category.title}
                </h3>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
export default CategorySelection
