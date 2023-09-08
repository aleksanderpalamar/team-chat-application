import { Loader2Icon } from "lucide-react"

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">Loading</h1>
      <div className="animate-spin text-gray-500 dark:text-gray-50 mx-auto">
        <Loader2Icon className="w-8 h-8" />
      </div>
    </div>
  )
}

export default Loading