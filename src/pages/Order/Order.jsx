import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { TokenContext } from "../../context/Token.context";
import Loading from "../../components/loading/Loading";

export default function Orders() {
  const { token } = useContext(TokenContext);
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded); // ✅ شوفي هنا الـ id ولا _id

    const userId = decoded.id || decoded._id; // جرب الاثنين

    async function getAllOrder() {
      try {
        const option = {
          url: `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
          method: "GET",
        };
        const { data } = await axios.request(option);

        console.log("Orders API response:", data); // ✅ شوفي شكل الـ response

        // لو الـ response Array على طول
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data.orders) {
          // لو في object جواه orders
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    }

    getAllOrder();
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  if (!orders || orders.length === 0) {
    return <div className="p-6 text-center">You have no orders.</div>;
  }

  return (
    <div className="p-6 my-15 max-w-5xl mx-auto">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg shadow-sm bg-white p-4 mb-6"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold text-gray-800">#{order.id}</p>
            </div>
            <div className="flex gap-2">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-md text-white ${
                  order.isDelivered ? "bg-green-600" : "bg-blue-600"
                }`}
              >
                {order.isDelivered ? "DELIVERED" : "UNDER DELIVERY"}
              </span>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-md text-white ${
                  order.isPaid ? "bg-green-600" : "bg-yellow-500"
                }`}
              >
                {order.isPaid ? "PAID" : "NOT PAID"}
              </span>
            </div>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {order.cartItems?.map((item) => (
              <div key={item._id} className="border rounded-md overflow-hidden">
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 text-sm">
                  <p className="font-medium text-gray-800 truncate">
                    {item.product.title}
                  </p>
                  <p className="text-gray-500">
                    Category: {item.product.category.name}
                  </p>
                  <p className="text-gray-700">Price: {item.price}</p>
                  <p className="text-gray-700">Count: {item.count}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="text-right font-semibold text-gray-800">
            Total order price:{" "}
            <span className="text-main">{order.totalOrderPrice}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
