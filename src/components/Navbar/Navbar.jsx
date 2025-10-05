import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import IconImage from '../../assets/images/freshcart-logo.svg'
import { Heart, LogOut, Menu, ShoppingCart, X } from 'lucide-react'
import { TokenContext } from '../../context/Token.context'
import { CartContext } from '../../context/card.context'
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const {token ,logOut} = useContext(TokenContext)
  const {cartInfo} = useContext(CartContext)
  return (
    <nav className="bg-slate-200 fixed w-full top-0 z-50 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home">
          <img src={IconImage} alt="FreshCart Logo" className="h-8" />
        </Link>
        {/* Desktop Links */}
        {token?<ul className="hidden md:flex gap-4 *:cursor-pointer">
          <li><NavLink className="text-gray-700 hover:font-semibold" to="/home">Home</NavLink></li>
          <li><NavLink className="text-gray-700 hover:font-semibold" to="/products">Products</NavLink></li>
          <li><NavLink className="text-gray-700 hover:font-semibold" to="/categories">Categories</NavLink></li>
          <li><NavLink className="text-gray-700 hover:font-semibold" to="/brands">Brands</NavLink></li>
          <li><NavLink className="text-gray-700 hover:font-semibold" to="/Order">Orders</NavLink></li>
        </ul>:null}
        {/* Desktop Right Side */}
        <ul className="hidden md:flex items-center gap-4 *:cursor-pointer *:hover:text-main">
          <li><Link className='relative' to="/cart">

          <ShoppingCart/> 
          <h5  className="absolute bottom-3 left-4 bg-main text-white text-xs rounded-full px-1 "> {cartInfo.numOfCartItems}</h5>
          </Link></li>
          <li ><Link   to="/WishList">
          <Heart/> 
           </Link></li>
          <li><i className="fa-brands fa-facebook"></i></li>
          <li><i className="fa-brands fa-twitter"></i></li>
          <li><i className="fa-brands fa-instagram"></i></li>
          <li><i className="fa-brands fa-linkedin"></i></li>
          {token? <li onClick={logOut}><LogOut className="cursor-pointer" /></li>:
          <> <li><NavLink className="text-gray-700 hover:font-semibold" to="/login">Login</NavLink></li>
          <li><NavLink className="text-gray-700 hover:font-semibold" to="/register">Register</NavLink></li>
        </>}
        </ul>
        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-100">
          <ul className="flex flex-col gap-3 p-4">
            <li><NavLink to="/home" onClick={() => setIsOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/Products" onClick={() => setIsOpen(false)}>Products</NavLink></li>
            <li><NavLink to="/categories" onClick={() => setIsOpen(false)}>Categories</NavLink></li>
            <li><NavLink to="/brands" onClick={() => setIsOpen(false)}>Brands</NavLink></li>
            <li><NavLink to="/Order" onClick={() => setIsOpen(false)}>Orders</NavLink></li>
            <li><NavLink to="/login" onClick={() => setIsOpen(false)}>Login</NavLink></li>
            <li><NavLink to="/register" onClick={() => setIsOpen(false)}>Register</NavLink></li>
          </ul>
        </div>
      )}
    </nav>
  )
}
