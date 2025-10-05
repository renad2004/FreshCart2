import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { TokenContext } from "./Token.context"   // ناخد الـ context
import toast from "react-hot-toast"

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)

  const { token } = useContext(TokenContext)  

   async function getWishlist() {
    if (!token) return
    try {
      setLoading(true)
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token } }
      )
      setWishlist(data.data)
 
    } catch (error) {
      console.error("Error fetching wishlist", error)
       toast.error("Something went wrong!");

    } finally {
      setLoading(false)
    }
  }

   async function addToWishlist(productId) {
    if (!token) return
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token } }
      )
      toast.success(data.message || "Added to wishlist successfully!");

      await getWishlist()   
      return data

    } catch (error) {
      console.error("Error adding to wishlist", error)
      toast.error("Something went wrong!");
    }
  }

   async function removeFromWishlist(productId) {
    if (!token) return
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
      )
              toast.success(data.message || "Removed from wishlist successfully!");

      await getWishlist()   
      return data
    } catch (error) {
      console.error("Error removing from wishlist", error)
      toast.error("Something went wrong!");
    }
  }

   useEffect(() => {
    getWishlist()
  }, [token])

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

// Hook سهل الاستخدام
export function useWishlist() {
  return useContext(WishlistContext)
}
