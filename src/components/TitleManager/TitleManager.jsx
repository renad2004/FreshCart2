import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const titles = {
  "/login": "Login",
  "/register": "Register",
  "/forgot-password": "Forgot Password",
  "/verifyCode": "Verify Code",
  "/resetPassword": "Reset Password",
  "/home": "Home",
  "/cart": "Cart",
  "/wishlist": "Wishlist",
  "/brands": "Brands",
  "/products": "Products",
  "/order": "Orders",
  "/checkout": "Checkout",
}

export default function TitleManager() {
  const location = useLocation()

  useEffect(() => {
     const currentPath = location.pathname.toLowerCase()

     document.title = titles[currentPath] || "My Shop"
  }, [location])

  return null
}
