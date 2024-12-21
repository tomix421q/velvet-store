'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { productSchema, ProductSchemaType } from '@/utills/zodSchemas'
import { ChevronLeft, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProduct } from '@/app/actions'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import { UploadDropzone } from '@/utills/uploadthing'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { SubmitButton } from '@/components/SubmitButtons'

const ProductCreatePage = () => {
  const [images, setImages] = useState<string[]>([])
  const [data, setData] = useState<ProductSchemaType>()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      status: 'published',
      category: 'velvet_calm',
      isFeatured: false,
      images: images,
    },
    mode: 'onChange',
  })

  const processForm: SubmitHandler<ProductSchemaType> = async (data) => {
    const result = await createProduct(data)

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

  //   console.log('Errors:', errors)
  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }
  useEffect(() => {
    setValue('images', images)
  }, [images, setValue])

  return (
    <form
      onSubmit={handleSubmit((data) => {
        processForm(data)
      })}
    >
      <div className='flex items-center gap-4'>
        <Button variant={'outline'} size={'icon'} asChild>
          <Link href={'/admin/products'}>
            <ChevronLeft className='!size-6' />
          </Link>
        </Button>
        <h1 className='text-xl font-semibold tracking-tight'>Products</h1>
      </div>

      <Card className='mt-5'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Product details</CardTitle>
          <CardDescription>In this form you can create new product</CardDescription>
        </CardHeader>
        {/*  */}
        {/* FORM */}
        <CardContent>
          <div className='flex flex-col gap-10'>
            {/* Name  */}
            <div className='flex flex-col gap-2'>
              <Label className='flex gap-x-4 items-center h-3'>
                Name {errors.name?.message && <p className='text-xs text-red-400 '>{errors.name.message}</p>}
              </Label>
              <Input type='text' {...register('name')} />
            </div>
            {/* Description */}
            <div className='flex flex-col gap-2'>
              <Label className='flex gap-x-4 items-center h-3'>
                Description {errors.description?.message && <p className='text-xs text-red-400'>{errors.description.message}</p>}
              </Label>
              <Textarea {...register('description')} />
            </div>
            {/* Price */}
            <div className='flex flex-col gap-2'>
              <Label className='flex gap-x-4 items-center h-3'>
                Price (€) {errors.price?.message && <p className='text-sm text-red-400'>Please insert price</p>}{' '}
              </Label>
              <Input {...register('price', { valueAsNumber: true })} type='number' placeholder='Example : 55'></Input>
            </div>
            {/* Status Select */}
            <div className='flex flex-col gap-2'>
              <Label>Status</Label>
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      setValue('status', value as ProductSchemaType['status'], {
                        shouldValidate: true,
                      })
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={'Select Status'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='draft'>Draft</SelectItem>
                      <SelectItem value='published'>Published</SelectItem>
                      <SelectItem value='archived'>Archived</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status?.message && <p className='text-sm text-red-400'>{errors.status.message}</p>}
            </div>

            {/* Category Select */}
            <div className='flex flex-col gap-2'>
              <Label>Category</Label>
              <Controller
                name='category'
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      setValue('category', value as ProductSchemaType['category'], {
                        shouldValidate: true,
                      })
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select Category' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='velvet_calm'>Velvet Calm</SelectItem>
                      <SelectItem value='velvet_comfort'>Velvet Comfort</SelectItem>
                      <SelectItem value='velvet_glow'>Velvet Glow</SelectItem>
                      <SelectItem value='velvet_aura'>Velvet Aura</SelectItem>
                      <SelectItem value='velvet_bloom'>Velvet Bloom</SelectItem>
                      <SelectItem value='velvet_essence'>Velvet Essence</SelectItem>
                      <SelectItem value='velvet_other'>Velvet Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category?.message && <p className='text-sm text-red-400'>{errors.category.message}</p>}
            </div>

            {/* Switch pro isFeatured */}
            <div className='flex flex-col gap-2'>
              <Label>Add to featured products?</Label>
              <Controller
                name='isFeatured'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => {
                      setValue('isFeatured', checked, { shouldValidate: true })
                    }}
                  />
                )}
              />
            </div>
            {/*  */}
            {/* IMAGES */}
            <div className='flex flex-col gap-2'>
              <Label>Images</Label>
              <Input type='hidden' value={images} {...register('images', { value: images })} />

              {images.length > 0 ? (
                <div className='flex gap-5'>
                  {images.map((image, index) => (
                    <div className='relative w-[100px] h-[100px] mt-4' key={index}>
                      <Image
                        src={image}
                        alt='product image'
                        className='w-full h-full object-cover rounded-lg border'
                        height={100}
                        width={100}
                      />
                      <button
                        type='button'
                        onClick={() => handleDelete(index)}
                        className='absolute -top-3 -right-3 bg-red-500 p-1 rounded-lg text-white'
                      >
                        <XIcon className='size-4' />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint={'imageUploader'}
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url))
                  }}
                  onUploadError={() => {
                    alert('Something went wrong')
                  }}
                />
              )}
              {errors.images?.message && <p className='text-sm text-red-400'>{errors?.images.message}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className='mt-24'>
          <SubmitButton text='Add product' className='w-full' />
        </CardFooter>
      </Card>
    </form>
  )
}
export default ProductCreatePage
