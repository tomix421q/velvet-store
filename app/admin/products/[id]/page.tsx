import EditForm from '@/components/admin/EditForm'
import prisma from '@/utills/db'
import { notFound } from 'next/navigation'

const getData = async (productId: string) => {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!data) {
    return notFound()
  }
  return data
}

const EdiPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const data = await getData(id)
  // console.log(data)

  return <EditForm productData={{ data }} />
}
export default EdiPage
