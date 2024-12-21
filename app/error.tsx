'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    console.error('Caught error: ', error)
  }, [])

  return (
    <div className='w-[50%] mx-auto h-[80vh] flex items-center justify-center flex-col gap-4'>
      <span>
        <ShieldAlert className='fill-red-500 size-24' />
      </span>
      <h2 className='text-secondary font-bold text-2xl lg:text-4xl flex items-center'>Something went wrong.</h2>
      <Separator />
      <p className='text-primary font-normal text-2xl'>
        <span className='text-primary text-xl'>Error :</span>
        <span className='text-red-500 text-base'> {error.message}</span>
      </p>
      <div className='flex gap-x-4 lg:gap-x-6'>
        <Button variant={'destructive'} size={'lg'} onClick={() => reset()}>
          Try again
        </Button>
        <Button asChild variant={'default'} size={'lg'}>
          <Link href={'/'}>Back to home</Link>
        </Button>
      </div>
    </div>
  )
}
export default ErrorPage
