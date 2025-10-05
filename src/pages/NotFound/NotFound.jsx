export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh] text-center">
      <h1 className="text-4xl font-bold text-main mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-4">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/home"
        className="bg-main text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Go Home
      </a>
    </div>
  )
}
