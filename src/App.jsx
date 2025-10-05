import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import Layout from "./components/Layout/Layout"
import { Toaster } from "react-hot-toast"
import ForgotPassword from "./pages/ForgotPassword/forgot-password"
import VerifyResetCode from "./pages/VerifyResetCode/VerifyResetCode"
import ResetPassword from "./pages/resetPassword/resetPassword"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import GuardRoute from "./components/GuardRoute/GuardRoute"
import TokenProvider from "./context/Token.context"
import CartProvider from "./context/card.context"
 import Order from "./pages/Order/Order"
import Checkout from "./pages/Checkout/Checkout"
import OnLine from "./components/onLine/OnLine"
import NotFound from "./pages/NotFound/NotFound"
import { WishlistProvider } from "./context/wishlist.context"
import WishList from "./pages/WishList/WishList"
import Brands from "./pages/Brands/Brands"
import BrandDetails from "./pages/BrandDetails/BrandDetails"
import Products from "./pages/Products/Products"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
 
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GuardRoute>
        <Layout />
      </GuardRoute>
    ),
    children: [
      { index: true, element: <Navigate to="login" /> }, 
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verifyCode", element: <VerifyResetCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "home", element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "ProductDetails/:id" , element:<ProductDetails/>},
      { path: "order" , element:<Order/>},
      { path: "WishList" , element:<WishList/>},
      { path: "Brands" , element:<Brands/>},
      { path: "Products" , element:<Products/>},
       { path: "brands/:id" , element:<BrandDetails/>},
      {path: "checkout/:cartId",element: <Checkout />,},
      { path: "*", element: <NotFound /> }, 
      



    ],
  },
])

function App() {
  return (
    <OnLine>
      <TokenProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
            <Toaster />
          </WishlistProvider>
        </CartProvider>
      </TokenProvider>
    </OnLine>
  )
}
export default App
