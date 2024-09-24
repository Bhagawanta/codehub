import { CircleOffIcon } from 'lucide-react'

const NetWorkFailure = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
    <section className="bg-white shadow-md rounded-md grid place-items-center p-5 space-y-5 hover:cursor-pointer">
      <h1>Please check your network connection</h1>
      <CircleOffIcon className="h-4 w-4" />
    </section>
  </div>
  )
}

export default NetWorkFailure