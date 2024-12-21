'use client'
import { createBanner } from '@/app/actions'
import { SubmitButton } from '@/components/SubmitButtons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadDropzone } from '@/utills/uploadthing'
import { bannerSchema, BannerSchema } from '@/utills/zodSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const CreateBannerPage = () => {
  const [image, setImage] = useState<string | undefined>('')
  const [data, setData] = useState<BannerSchema>()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    trigger,
    formState: { errors },
  } = useForm<BannerSchema>({
    resolver: zodResolver(bannerSchema),
    mode: 'onChange',
    defaultValues: {
      imageString: image,
      title: '',
    },
  })
  console.log(errors)
  const processForm: SubmitHandler<BannerSchema> = async (data) => {
    const result = await createBanner(data)
    if (!result) {
      console.log('Something went wrong')
      return
    }
    if (result.errors) {
      console.log(result.errors)
    }
    reset()
    setData(data)
  }

  const handleDelete = () => {
    setImage('')
  }

  useEffect(() => {
    setValue('imageString', image as string)
    if (image?.includes('http')) trigger('imageString')
    //triger =  (revalidate)
  }, [image, setValue])

  return (
    <form
      onSubmit={handleSubmit((data) => {
        processForm(data)
      })}
    >
      <div className='flex items-center gap-x-4'>
        <Button variant={'outline'} size={'icon'}>
          <Link href={`/admin/banner`}>
            <ChevronLeft />
          </Link>
        </Button>
        <h1 className='text-xl font-semibold tracking-tight'>Banner</h1>
      </div>

      <Card className='mt-5'>
        <CardHeader>
          <CardTitle>Banner details</CardTitle>
          <CardDescription>Create your banner here</CardDescription>
        </CardHeader>
        {/*  */}
        <CardContent>
          <div className='flex flex-col gap-y-6 max-w-xl mx-auto mt-8'>
            <div className='flex flex-col gap-3'>
              <Label className='flex items-center h-3'>
                Banner text <span className='text-secondary ml-1 mr-3'>(not required)</span>
                {errors.title?.message && <p className='text-xs text-red-400'>{errors.title.message}</p>}
              </Label>
              <Input type='text' {...register('title')} />
            </div>
            {/*  */}
            {/* IMAGE */}
            <div className='flex flex-col gap-3'>
              <Label className='flex gap-x-2'>
                Image {errors.imageString?.message && <p className='text-xs text-red-400'>{errors.imageString.message}</p>}
              </Label>
              <input type='hidden' {...register('imageString')} />
              {image ? (
                <div className='relative w-fit mx-auto mt-4'>
                  <Image
                    src={image}
                    alt='banner image'
                    width={200}
                    height={200}
                    className=' w-[200px] h-[200px] object-cover border rounded-lg'
                  />
                  <Button
                    size={'icon'}
                    variant={'destructive'}
                    className='absolute -top-4 -right-4 rounded-full'
                    onClick={handleDelete}
                  >
                    <XIcon />
                  </Button>
                </div>
              ) : (
                <UploadDropzone
                  endpoint={'imageUploader'}
                  onClientUploadComplete={(res) => {
                    setImage(res[0].url)
                  }}
                  onUploadError={() => {
                    alert('Something went wrong.')
                  }}
                />
              )}
            </div>
            <CardFooter>
              <SubmitButton text={'Create banner'} className='w-full mt-10' />
            </CardFooter>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
export default CreateBannerPage
