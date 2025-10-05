import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import { CartContext } from '../../context/card.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/wishlist.context'   // 👈 استيراد الهُوك

export default function Card({ productinfo }) {
  const { id, title, description, price, category, ratingsAverage, imageCover } = productinfo
  const { addToCart } = useContext(CartContext)
  const { addToWishlist } = useWishlist()    

  return (
    <div className='card bg-white my-20 shadow-xl group rounded-xl overflow-hidden'>
      {/* Product Image */}
      <div className="relative">
        <img src={imageCover} alt={title} className="w-full h-64 object-cover" />
        <div className='absolute opacity-0 group-hover:opacity-100 bg-gray-500/40 inset-0 flex justify-center items-center gap-3 transition-all'>
          <Heart onClick={() => addToWishlist(id)} className='bg-main text-white p-2 w-8 h-8 rounded-full hover:text-main hover:bg-white transition-all cursor-pointer' />
          <ShoppingCart onClick={() => addToCart(id)} className='bg-main text-white p-2 w-8 h-8 rounded-full hover:text-main hover:bg-white transition-all cursor-pointer' />
          <Link to={`/productDetails/${id}`}>
            <Eye className='bg-main text-white p-2 w-8 h-8 rounded-full hover:text-main hover:bg-white transition-all cursor-pointer' />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className='card-body space-y-4 p-4'>
        <div>
          <h2 className='text-xl line-clamp-1 font-semibold text-main'>{title}</h2>
          <h3 className='text-lg  font-semibold text-gray-600'>{category?.name || category}</h3>
        </div>

        <p className='text-sm text-slate-500 line-clamp-2'>{description}</p>

        <div className='flex justify-between items-center'>
          <h3 className="text-lg font-bold text-main">${price}</h3>
          <h3 className="flex items-center gap-1 text-gray-600">
            <FontAwesomeIcon className='text-yellow-400' icon={faStar} />
            {ratingsAverage || "N/A"}
          </h3>
        </div>
      </div>
    </div>
  )
}
