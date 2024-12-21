const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className='mt-16 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24'>
        <p className='text-xs leading-5 text-gray-700'>&copy; {currentYear} VelvetStore.All Rights Reserved</p>
      </div>
    </div>
  )
}
export default Footer
