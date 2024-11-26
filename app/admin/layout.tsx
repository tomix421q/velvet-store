import { ReactNode } from 'react'
// import { unstable_noStore as noStore } from 'next/cache'

const adminLayout = async ({ children }: { children: ReactNode }) => {
  
  return (
    <div>
      adminLayout
      {children}
    </div>
  )
}
export default adminLayout
