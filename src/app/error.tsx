'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const ErrorPage = () => {
  const router = useRouter();
  return (
    <div className='flex min-h-screen flex-1 items-center justify-center gap-5'>
      <h1>Something went wrong !</h1>
      <Button onClick={()=>router.refresh()}>Click here, To reload</Button>
    </div>
  )
}

export default ErrorPage