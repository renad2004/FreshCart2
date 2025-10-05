import { useContext, useEffect } from 'react'
import { CartContext } from '../../context/card.context.jsx'
import { ShoppingCart } from 'lucide-react'
import CartItem from '../../components/CartItem/CartItem.jsx'
import Loading from '../../components/loading/Loading.jsx'
import { Link } from 'react-router-dom'
import Checkout from '../Checkout/Checkout.jsx'

export default function Cart() {
  const { getAllCart, cartInfo ,clearCart } = useContext(CartContext)

  useEffect(() => {
    getAllCart()
  }, [])

  if (!cartInfo || !cartInfo.data) return <Loading />

  if (cartInfo.numOfCartItems === 0) {
    return (
      <section className='my-30  p-10 flex justify-center flex-col items-center gap-1'>
        <h2 className="text-center text-xl font-semibold my-5">Cart is empty</h2>
        <Link to="/home">
          <button className="bg-main text-white px-4 py-2 rounded-lg hover:bg-main-dark transition">
            Go to shop
          </button>
        </Link>
      </section>
    )
  }

  return (
    <section className="bg-gray-200 p-10 my-20 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold flex gap-3 items-center mb-4">
        Shop cart <ShoppingCart />
      </h2>

      <h3 className="text-xl text-main mb-6">
        Total : ${cartInfo.data.totalCartPrice}
      </h3>

      <div>
        {cartInfo.data.products.map((cart) => (
          <CartItem key={cart._id} cartInfo={cart} item={cart} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button 
          onClick={clearCart}  
          className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          CLEAR CART
        </button>

<Link to={`/checkout/${cartInfo.data._id}`}>
  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
    Checkout
  </button>
</Link>
      </div>
    </section>
  )
}
