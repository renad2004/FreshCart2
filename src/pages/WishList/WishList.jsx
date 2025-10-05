import Loading from "../../components/loading/Loading"
import { Link } from "react-router-dom"
import { useWishlist } from "../../context/wishlist.context"
import { Heart, X } from "lucide-react"

export default function Wishlist() {
  const { wishlist, loading, removeFromWishlist } = useWishlist()

  if (loading) return <Loading />

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="p-10 my-35 text-center">
        <h2 className="text-2xl   p-2   font-semibold text-gray-700 mb-4">
          Your wishlist is empty 
        </h2>
        <Link
          to="/home"
          className="bg-main text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          Go Shopping
        </Link>
      </div>
    )
  }

  return (
    <section className="p-6 my-30 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-gray-800 border-b-2 border-gray-200 pb-4">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl shadow-md bg-white hover:shadow-xl transition transform hover:-translate-y-1 relative"
          >
             <button
              onClick={() => removeFromWishlist(item._id)}
              className="absolute cursor-pointer top-3 right-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-full p-2 shadow-md transition"
            >
              <X size={18} />
            </button>

             <img
              src={item.imageCover}
              alt={item.title}
              className="w-full h-52 object-cover rounded-t-2xl"
            />

             <div className="p-5 space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {item.title}
              </h2>
              <p className="text-gray-500 text-sm">
                {item.category?.name || "No category"}
              </p>
              <p className="text-main font-bold text-lg">EGP {item.price}</p>

              {/* Actions */}
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/productDetails/${item._id}`}
                  className="bg-main cursor-pointer text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
