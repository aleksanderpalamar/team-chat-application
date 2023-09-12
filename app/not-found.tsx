const NotFound = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">
        Not Found <span className="text-violet-500 text-6xl font-extrabold">404</span>
      </h1>
      <p className="text-sm text-zinc-500 mt-4">
        The page you are looking for does not exist
      </p>
    </div>
  )
}

export default NotFound