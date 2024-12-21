import { changeIndexAction } from '@/app/actions'
import { SubmitButton } from '../SubmitButtons'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const BannerIndexDIalog = ({ bannerIndex, maxIndex, bannerId }: { bannerIndex: number; maxIndex: number; bannerId: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='w-full !text-start flex justify-start  p-2'>
          Change index
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Edit banner index</DialogTitle>
          <DialogDescription>You can change banner index, index 1 is first picture on landing page.</DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div>
            <h3 className='flex gap-x-2'>
              Actual banner index is : <span className='text-primary font-semibold'>{bannerIndex}</span>
            </h3>
          </div>
          <div>
            <form action={changeIndexAction}>
              <div className='flex items-center gap-x-4'>
                <input type='hidden' name='bannerId' value={bannerId} />
                <input type='hidden' name='oldBannerIndex' value={bannerIndex} />
                <Label htmlFor='newBannerIndex'> Set new index for banner :</Label>

                <Input id='newBannerIndex' name='newBannerIndex' type='number' max={maxIndex} min={0} />
              </div>

              <SubmitButton text={'Save changes'} className='w-full mt-10' />
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default BannerIndexDIalog
