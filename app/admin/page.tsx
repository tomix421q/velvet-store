import AdminStats from '@/components/admin/AdminStats'
import Chart from '@/components/admin/Chart'
import RecentSales from '@/components/admin/RecentSales'
import prisma from '@/utills/db'

const getData = async () => {
  const now = new Date()
  const sevedDaysAgo = new Date()
  sevedDaysAgo.setDate(now.getDate() - 7)

  const data = prisma.order.findMany({
    where: {
      createAt: {
        gte: sevedDaysAgo,
      },
    },
    select: {
      amount: true,
      createAt: true,
    },
    orderBy: {
      createAt: 'asc',
    },
  })
}

const AdminMainPage = async () => {
  const data = await getData()

  return (
    <>
      <AdminStats />
      <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10'>
        <Chart data={data} />
        <RecentSales />
      </div>
    </>
  )
}
export default AdminMainPage
