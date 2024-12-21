import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import prisma from '@/utills/db'
import { ProductOrder } from '@/utills/types'
import { ListOrdered, Timer, X } from 'lucide-react'
import Link from 'next/link'

const getData = async () => {
  try {
    // const user = await checkUser()
    const getDbData = await prisma.order.findMany({
      select: { id: true, status: true, amount: true, createAt: true, items: true },
    })

    const totalComplete = await prisma.order.count({ where: { status: 'complete' } })
    const totalPending = await prisma.order.count({ where: { status: 'pending' } })
    const totalDeclined = await prisma.order.count({ where: { status: 'declined' } })

    return { data: getDbData, totalComplete, totalPending, totalDeclined }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { data: [], totalComplete: 0, totalPending: 0, totalDeclined: 0 }
  }
}

const OrdersPage = async () => {
  const data = await getData()
  //   console.log(data)

  return (
    <div className='mt-10'>
      {/* Status section  */}
      <section className='flex flex-col lg:flex-row gap-6 text-secondary mb-10'>
        <div className='flex justify-center gap-x-4 bg-gradient-to-l from-green-200 to-green-300 p-4 w-full lg:w-fit rounded-xl shadow-2xl shadow-primary/30'>
          <div className='grid items-center justify-center'>
            <h3 className='font-semibold text-lg'>Total Complete Orders</h3>
            <p className='mx-auto font-extrabold text-4xl text-black'>{data.totalComplete}</p>
          </div>
          <span>
            <ListOrdered className='size-20 text-primary' />
          </span>
        </div>
        <div className='flex justify-center gap-x-4 bg-gradient-to-l from-orange-200 to-orange-300 p-4 w-full lg:w-fit rounded-xl shadow-2xl shadow-primary/30'>
          <div className='grid items-center justify-center'>
            <h3 className='font-semibold text-lg'>Total Pending Orders</h3>
            <p className='mx-auto font-extrabold text-4xl text-black'>{data.totalPending}</p>
          </div>
          <span>
            <Timer className='size-20 text-primary' />
          </span>
        </div>
        <div className='flex justify-center gap-x-4 bg-gradient-to-l from-red-200 to-red-300 p-4 w-full lg:w-fit rounded-xl shadow-2xl shadow-primary/30'>
          <div className='grid items-center justify-center'>
            <h3 className='font-semibold text-lg'>Total Declined Orders</h3>
            <p className='mx-auto font-extrabold text-4xl text-black'>{data.totalDeclined}</p>
          </div>
          <span>
            <X className='size-20 text-primary' />
          </span>
        </div>
      </section>
      <Separator />
      {/* Orders section */}
      <section className='mt-10 flex flex-col gap-10 font-[sourcepro] '>
        {data.data.map((item) => {
          return (
            <Card key={item.id} className='flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-lg shadow-primary/20'>
              <div className='min-w-[420px]'>
                <CardHeader>
                  <CardTitle>
                    <span className='text-xs text-secondary'>{item.id}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3>
                    Status: <span>{item.status}</span>
                  </h3>
                  <h3>
                    Amount: <span>{new Intl.NumberFormat('en-US').format(item.amount)}€</span>
                  </h3>
                </CardContent>
                <CardFooter className='text-secondary'>
                  <p>
                    Created at: <span>{new Intl.DateTimeFormat('sk-Eu').format(new Date(item.createAt))}</span>
                  </p>
                </CardFooter>
              </div>
              <span className='w-[0.1px] h-auto bg-primary/80 ' />
              <CardDescription className='p-2 text-center flex flex-wrap'>
                <h2 className='font-[sourcepro] text-xl w-full font-bold border-b border-primary'>Your products in order.</h2>
                {item.items.map((product: ProductOrder) => (
                  <>
                    <Link
                      href={`/product/${product.productId}`}
                      className='flex flex-col m-2 text-primary-foreground items-start text-xs mt-4'
                    >
                      <span className='text-xs'>Productg id : {product.productId}</span>
                      <span className='text-xs'>Name: {product.name}</span>
                      <span className='text-xs'>Product price: {product.price}€</span>
                      <span className='text-xs'>Quantity: {product.quantity}</span>
                    </Link>
                  </>
                ))}
              </CardDescription>
            </Card>
          )
        })}
      </section>
    </div>
  )
}
export default OrdersPage
