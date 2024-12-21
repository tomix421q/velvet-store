import prisma from '@/utills/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user === null || !user.id) {
    throw new Error('Something went wrong')
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  })

  if (!dbUser) {
    const userCount = await prisma.user.count()

    try {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.given_name ?? '',
          lastName: user.family_name ?? '',
          email: user.email ?? '',
          profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
          role: userCount === 0 ? 'admin' : 'user',
        },
      })
      console.log('User created successfully:', dbUser)
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/'
      : 'https://velvet-store-920rjjo5r-tomix421qs-projects.vercel.app/'
  )
}
