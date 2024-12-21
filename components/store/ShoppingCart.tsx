'use client'
import { cartStorage } from '@/utills/cartStorage'
import { Cart } from '@/utills/types'
import { Frown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import placeholderImg from '@/public/placeholder.svg'
import { AddToCart } from './AddToCart'
import { checkOut } from '@/app/actions'
import { useRouter } from 'next/navigation'

const ShoppingCart = ({ userId }: { userId: string }) => {
  const [userStorage, setUserStorage] = useState<Cart | null>()
  const [refresh, setRefresh] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const totalPrice =
    userStorage?.items.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0) || 0

  useEffect(() => {
    const getFromLC = cartStorage.get(userId)
    setUserStorage(getFromLC)
    setRefresh(false)
  }, [userId, refresh])

  const handleCheckout = async () => {
    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.set('cart', JSON.stringify(userStorage))

    try {
      const result = await checkOut(formData)
      if (!result.success) {
        setError(result.error || 'Undefined fault.')
      } else {
        cartStorage.remove(userId)
        router.push('/order-confirmation')
      }
    } catch (err) {
      setError('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  const EmptyShoppingBag = () => {
    return (
      <>
        <div className='flex flex-col gap-y-6 items-center justify-center h-[60vh]'>
          <h2 className='flex gap-x-2 text-4xl lg:text-8xl font-bold tracking-wide items-center font-[sourcepro]'>
            Empty <Frown className='size-10 lg:size-24 fill-red-500' />
          </h2>
          <Button variant={'default'} size={'lg'} asChild className='font-[sourcepro]'>
            <Link href={'/products/all'}>Check Product</Link>
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      {userStorage?.items.length! > 0 ? (
        <div className='max-w-2xl mx-auto mt-10 '>
          {userStorage?.items.map((item) => (
            <div key={item.id} className='flex border-b pb-2'>
              <div className='w-24 h-24 sm:w-32 relative'>
                <Image
                  src={item.imageString ? item.imageString[0] : placeholderImg}
                  alt={'Product Image'}
                  fill
                  sizes='(max-width: 368px) 100vw, (max-width: 600px) 50vw, 33vw'
                  className='object-cover rounded-lg w-[100px]'
                  priority
                />
              </div>
              <div className='ml-5 flex justify-between flex-col sm:flex-row w-full font-medium'>
                <p>{item.name}</p>
                <div className='flex flex-col h-full justify-between items-end'>
                  <p className='text-primary text-xl'>{item.price * item.quantity}€</p>

                  <div className='flex gap-x-4' onClick={() => setRefresh(true)}>
                    <AddToCart userId={userId as string} productData={item as unknown} inCart={true} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className='mt-10'>
            <div className='flex items-center justify-between font-medium'>
              <p>Subtotal:</p>
              <p>{new Intl.NumberFormat('en-US').format(totalPrice)}€</p>
            </div>

            <div>
              {error && <div className='text-red-500 mb-4'>{error}</div>}
              <Button variant={'default'} size={'lg'} onClick={handleCheckout} disabled={isLoading} className='w-full mt-5'>
                {isLoading ? 'Please wait...' : 'Checkout'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        userStorage?.items.length === 0 || (!userStorage && <EmptyShoppingBag />)
      )}
    </>
  )
}
export default ShoppingCart
