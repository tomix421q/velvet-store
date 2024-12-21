'use client'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

interface buttonProps {
  text: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null | undefined
  className?: string
}

export const SubmitButton = ({ text, variant, className }: buttonProps) => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <div>
          <Button disabled variant={variant}>
            <Loader2 className={`size-4 animate-spin mr-2 `} />
            Plase Wait
          </Button>
        </div>
      ) : (
        <Button variant={variant} type='submit' className={`${className}`}>
          {text}
        </Button>
      )}
    </>
  )
}

export const DeleteItem = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled size={'sm'} className='w-full mt-5 text-end' variant={'secondary'}>
          Removing...
        </Button>
      ) : (
        <Button size={'sm'} className='w-full mt-5' type='submit' variant={'secondary'}>
          Delete
        </Button>
      )}
    </>
  )
}

export const CheckoutButton = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled size={'sm'} className='w-full mt-5 text-end' variant={'default'}>
          <Loader2 className='mr-2 size-5 animate-spin' />
          Please Wait...
        </Button>
      ) : (
        <Button size={'sm'} className='w-full mt-5' type='submit' variant={'default'}>
          Checkout
        </Button>
      )}
    </>
  )
}
