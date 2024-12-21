'use client'
import { cartStorage } from '@/utills/cartStorage'
import { Cart } from '@/utills/types'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { MinusIcon, PlusIcon, ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react'
import { redirect, usePathname } from 'next/navigation'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'

export const AddToCart = ({ userId, productData, inCart }: { userId: string; productData: any; inCart?: boolean }) => {
  const [shopCart, setShopCart] = useState<Cart | null>()
  const productId: string = productData.id
  let existingItemIndex: number

  const path = usePathname()
  const userPath = path
  console.log(path)

  useEffect(() => {
    const cart = cartStorage.get(userId)
    if (!cart) return
    setShopCart(cart)
  }, [userId])

  const addToCart = (userId: string) => {
    // no exist user shoping cart
    if (!shopCart) {
      const newCart: Cart = {
        userId: userId,
        items: [
          {
            id: productData.id,
            imageString: productData.images,
            price: productData.price,
            name: productData.name,
            quantity: 1,
          },
        ],
      }
      cartStorage.save(userId, newCart)
      setShopCart(newCart)
      return
    }
    // existing item number ?
    existingItemIndex = shopCart.items.findIndex((item) => item.id === productId)

    if (existingItemIndex > -1) {
      // Exist
      const updatedCart = { ...shopCart }
      updatedCart.items[existingItemIndex].quantity += 1
      cartStorage.save(userId, updatedCart)
      setShopCart(updatedCart)
    } else {
      // No Exist
      const newItem = {
        id: productData.id,
        imageString: productData.images,
        price: productData.price,
        name: productData.name,
        quantity: 1,
      }

      const updatedCart = {
        ...shopCart,
        items: [...shopCart.items, newItem],
      }

      cartStorage.save(userId, updatedCart)
      setShopCart(updatedCart)
    }
  }

  const removeFromCart = () => {
    if (!shopCart) return

    const existingItemIndex = shopCart.items.findIndex((item) => item.id === productId)

    if (existingItemIndex > -1) {
      const updatedCart = { ...shopCart }
      const item = updatedCart.items[existingItemIndex]

      if (item.quantity > 1) {
        item.quantity -= 1
        cartStorage.save(userId, updatedCart)
        setShopCart(updatedCart)
      } else if (item.quantity === 1 && inCart) {
        return
      } else {
        updatedCart.items.splice(existingItemIndex, 1)
        cartStorage.save(userId, updatedCart)
        setShopCart(updatedCart)
      }
    }
  }

  const completeDelete = () => {
    if (!shopCart) return

    cartStorage.remove(userId)
    setShopCart(null)

    window.location.reload()
  }

  return (
    <>
      <div className='mt-20 flex flex-col items-center'>
        <h2 className='text-red-500 tracking-wider uppercase text-center'>Please login or register for next actions</h2>
        <div className='space-x-12 mt-4'>
          <Button asChild variant={'default'} size={'lg'}>
            <LoginLink>Sign in</LoginLink>
          </Button>

          <Button asChild variant={'outline'} size={'lg'}>
            <RegisterLink>Create Account</RegisterLink>
          </Button>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 ${!userId && 'hidden'}`}>
        <Button size={'lg'} className={`w-full mt-5 ${inCart && 'hidden'}`} type='submit' onClick={() => addToCart(userId)}>
          <ShoppingBag className='mr-4 size-5' />
          Add to cart
        </Button>
        <div className='flex gap-x-2 items-center'>
          <span className='flex gap-x-1'>
            <ShoppingCart className='!size-6' />
            <span className='font-normal text-secondary'>Nbr:</span>
          </span>
          <div className='flex items-center border'>
            <Button variant={'ghost'} size={'icon'} onClick={removeFromCart}>
              <MinusIcon className='!size-6 text-red-500 font-extrabold' />
            </Button>
            <span className='mx-2'>
              {shopCart?.items.reduce((total, item) => (item.id === productId ? total + item.quantity : total), 0)}{' '}
              {!shopCart && 0}
            </span>

            <Button variant={'ghost'} size={'icon'} onClick={() => addToCart(userId)}>
              <PlusIcon className='!size-6 text-green-500 font-extrabold' />
            </Button>
          </div>
          <Button
            className={`${inCart ? 'flex ml-4' : 'hidden'}`}
            variant={'destructive'}
            size={'icon'}
            onClick={() => completeDelete()}
          >
            <Trash2 className='!size-6' />
          </Button>
        </div>
      </div>
    </>
  )
}
