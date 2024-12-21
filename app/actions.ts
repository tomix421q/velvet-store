'use server'
import prisma from '@/utills/db'
import { Cart } from '@/utills/types'
import { bannerSchema, BannerSchema, productSchema, ProductSchemaType } from '@/utills/zodSchemas'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const checkUser = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  return user
}

export const checkUserPermission = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (user) {
    const data = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    })
    console.log('USER : }' + user)
    if (data?.role !== 'admin') redirect('/')
    return data
  } else {
    redirect('/')
  }
}

export async function createProduct(data: ProductSchemaType) {
  //   console.log(data)
  await checkUserPermission()
  const parsedData = productSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      status: 400,
      errors: parsedData.error.format(),
    }
  }
  const validateData = parsedData.data

  await prisma.product.create({
    data: {
      name: validateData.name,
      description: validateData.description,
      status: validateData.status,
      price: validateData.price,
      images: validateData.images,
      category: validateData.category,
      isFeatured: validateData.isFeatured,
    },
  })
  redirect('/admin/products')
}

export async function editProduct(data: ProductSchemaType, productId: string) {
  //   console.log(data)
  await checkUserPermission()
  const parsedData = productSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      status: 400,
      errors: parsedData.error.format(),
    }
  }
  const validateData = parsedData.data

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: validateData.name,
      description: validateData.description,
      status: validateData.status,
      price: validateData.price,
      images: validateData.images,
      category: validateData.category,
      isFeatured: validateData.isFeatured,
    },
  })
  redirect('/admin/products')
}

export const deleteProduct = async (formData: FormData) => {
  await prisma.product.delete({
    where: {
      id: formData.get('productId') as string,
    },
  })
  redirect('/admin/products')
}

export const createBanner = async (data: BannerSchema) => {
  await checkUserPermission()

  const parsedData = bannerSchema.safeParse(data)
  if (!parsedData.success) {
    return {
      status: 400,
      errors: parsedData.error.format(),
    }
  }

  const bannerIncIndex = await prisma.banner.findFirst({
    orderBy: { index: 'desc' },
    select: { index: true },
  })
  const newIndex = bannerIncIndex ? bannerIncIndex.index + 1 : 1

  const validatedData = parsedData.data

  await prisma.banner.create({
    data: {
      title: validatedData.title,
      imageString: validatedData.imageString,
      index: newIndex,
    },
  })

  redirect('/admin/banner')
}

export const deleteBanner = async (formData: FormData) => {
  await checkUserPermission()

  await prisma.banner.delete({
    where: {
      id: formData.get('bannerId') as string,
    },
  })

  redirect('/admin/banner')
}

export const changeIndexAction = async (index: FormData): Promise<void> => {
  const data = Object.fromEntries(index.entries())

  const newBannerIndexValue = Number(data.newBannerIndex)
  const oldBannerIndexValue = Number(data.oldBannerIndex)
  const updatedBannerId = data.bannerId
  //   console.log(newBannerIndexValue, oldBannerIndexValue, updatedBannerId)

  try {
    if (!newBannerIndexValue || !oldBannerIndexValue || !updatedBannerId) {
      throw new Error('Neplatné vstupné údaje')
    }
    const findOldBanner = await prisma.banner.findFirst({
      where: { index: newBannerIndexValue },
    })
    if (!findOldBanner) {
      throw new Error('Nebol nájdený banner s týmto indexom')
    }
    await prisma.$transaction([
      prisma.banner.update({
        where: { id: findOldBanner.id },
        data: { index: oldBannerIndexValue },
      }),
      prisma.banner.update({
        where: { id: updatedBannerId as string },
        data: { index: newBannerIndexValue },
      }),
    ])

    revalidatePath('/admin/banners')
  } catch (error) {
    console.error('Chyba pri aktualizácii indexu banneru:', error instanceof Error ? error.message : error)

    throw error
  }
}

export const addItem = async (productId: string) => {
  await checkUserPermission()

  const selectedProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  })
  if (!selectedProduct) {
    throw new Error('No product with this id')
  }
  revalidatePath('/', 'layout')
}

export const checkOut = async (formData: FormData) => {
  const cartData = formData.get('cart') as string
  if (!cartData) {
    return { error: 'No cart data' }
  }

  try {
    const cart: Cart = JSON.parse(cartData)
    // find user
    const userServer = await checkUser()
    const user = await prisma.user.findUnique({ where: { id: cart.userId } })
    if (!user || user.id !== userServer.id) {
      return { error: 'User not found' }
    }
    // find products
    const productIds = cart.items.map((item) => item.id)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })
    if (products.length !== cart.items.length) {
      return { error: 'Some products in the cart were not found in the database.' }
    }
    // check prices and exists product from db
    let totalPrice = 0
    for (const cartItem of cart.items) {
      const product = products.find((p) => p.id === cartItem.id)
      if (!product) {
        return { error: `Product with ID ${cartItem.id} not found.` }
      }
      totalPrice += product.price * cartItem.quantity
    }
    // create order
    await prisma.order.create({
      data: {
        amount: totalPrice,
        userId: userServer.id,
        items: {
          create: cart.items.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    })

    return { success: true, message: 'Order was created.', total: totalPrice }
  } catch (error) {
    return { error: 'Something went wrong.', details: error instanceof Error ? error.message : 'Undefined fault' }
  } finally {
    // redirect('/order-confirmation')
  }
}
