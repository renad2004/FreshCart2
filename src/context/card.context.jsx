 import axios from "axios";
import { createContext, useContext, useState } from "react";
import { TokenContext } from "./Token.context";
import toast from "react-hot-toast";

export const CartContext = createContext(null);
 
export default function CartProvider({ children }) {
  const { token } = useContext(TokenContext);
  const [cartInfo, setCartInfo] = useState([]);

//   addToCart
  async function addToCart(productId) {
     const loading = toast.loading('loading...')
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        data: { productId },
        headers: {
          token,
        },
      };

      const { data } = await axios.request(option);

      if (data.status === "success") {
        console.log(" Added to cart:", data);
        toast.success(data.message || "Added to cart successfully!");
        getAllCart(data)
       } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error adding to cart!");
    }
    finally{
     toast.dismiss(loading)
    }
  }

//   display

async function getAllCart() {
 const option = {
     url:"https://ecommerce.routemisr.com/api/v1/cart",
     method:"GET",
     headers:{
          token, 
     }
 }    
 
 const { data } = await axios.request(option);
  setCartInfo(data)
}

//remove from cart
  async function removeFromCart(productId) {
    const loading = toast.loading('loading...')
    try {
      const option = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(option);
      setCartInfo(data)
      if (data.status === "success") {
        console.log(" Removed from cart:", data);
        toast.success(data.message || "Removed from cart successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error removing from cart:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error removing from cart!");
    }
    finally{
      toast.dismiss(loading)
    }
  }

  //clear
  async function clearCart() {
  const loading = toast.loading("loading...");
  try {
    const option = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "DELETE",
      headers: {
        token,
      },
    };

    const { data } = await axios.request(option);
    console.log("Clear cart response:", data);

     if (data.status === "success" || data.message?.includes("success")) {
      toast.success(data.message || "Clear cart successfully!");
      setCartInfo(data);
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  } catch (error) {
    console.error("Error clear cart:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Error clear cart!");
  } finally {
    toast.dismiss(loading);
  }
}

//  update 
async function updateQuantity(productId, count) {
  const loading = toast.loading("updating...");
  try {
    const option = {
      url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      method: "PUT",
      headers: {
        token,
      },
      data: { count },
    };

    const { data } = await axios.request(option);
    console.log("Update quantity response:", data);

    if (data.status === "success") {
      toast.success("Quantity updated!");
      setCartInfo(data);
    } else {
      toast.error("Something went wrong!");
    }
  } catch (error) {
    console.error("Error updating quantity:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Error updating quantity!");
  } finally {
    toast.dismiss(loading);
  }
}


  return (
    <CartContext.Provider value={{ addToCart ,getAllCart,cartInfo,removeFromCart,clearCart,updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
