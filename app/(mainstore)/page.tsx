import Hero from '@/components/store/Hero'
import CategorySelection from '@/components/store/CategorySelection'
import FeaturedProducts from '@/components/store/FeaturedProducts'

const IndexPage = async () => {
  // const user = await checkUser()

  // console.log(user)
  return (
    <div>
      <Hero />
      <CategorySelection />
      <FeaturedProducts />
    </div>
  )
}

export default IndexPage
