'use client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const OrderConfirmationPage = () => {
  const router = useRouter()
  const totalTime = 5000
  const [remainingTime, setRemainingTime] = useState<number>(totalTime / 1000)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1)
    }, 1000)

    const timeout = setTimeout(() => {
      router.push('/')
    }, totalTime)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [router, totalTime])

  return (
    <div className='flex items-center justify-center h-[50vh] flex-col text-center font-[sourcepro]'>
      <h1 className='mb-3 text-3xl md:text-6xl font-extrabold bg-gradient-to-bl from-primary to-violet-300 bg-clip-text text-transparent'>
        Thank you for your order.
      </h1>
      <p className='text-md md:text-2xl'>You will be redirect to home page after {remainingTime} seconds.</p>
      <Loader2 className='mt-3 animate-spin size-20 ' />
    </div>
  )
}
export default OrderConfirmationPage
