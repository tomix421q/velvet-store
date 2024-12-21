import Footer from '@/components/store/Footer'
import Navbar from '@/components/store/Navbar'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className='max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 min-h-screen'>{children}</main>
      <Footer />
    </>
  )
}
export default layout
