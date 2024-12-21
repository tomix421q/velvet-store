import { LoaderIcon } from 'lucide-react'

export default function Loading() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <LoaderIcon className='w-10 h-10 animate-spin text-primary' />
    </div>
  )
}
