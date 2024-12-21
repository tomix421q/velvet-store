import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import ShoppingCart from '@/components/store/ShoppingCart'

const ShoppingBagPage = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) redirect('/')

  return (
    <div>
      <ShoppingCart userId={user.id} />
    </div>
  )
}
export default ShoppingBagPage
