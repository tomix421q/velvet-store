import prisma from '@/utills/db'
import CorouselClient, { bannerProps } from './CorouselClient'

const getData = async () => {
  const data = await prisma.banner.findMany({
    orderBy: {
      index: 'asc',
    },
  })
  return data
}

const Hero = async () => {
  const data = (await getData()) as bannerProps[]
  return <CorouselClient banner={data} />
}
export default Hero
