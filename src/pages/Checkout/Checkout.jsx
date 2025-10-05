import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { TokenContext } from "../../context/Token.context";

export default function Checkout() {
  const { cartId } = useParams(); 
  const { token } = useContext(TokenContext);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    details: "Nasr City, Cairo",
    phone: "01012345678",
    city: "Cairo",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleCheckout() {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: form },
        { headers: { token } }
      );
      console.log("Order Created:", data);
      alert("✅ Order placed successfully!");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("❌ Failed to place order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-gray-100 my-10 min-h-screen flex justify-center items-center py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Checkout
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address Details
            </label>
            <input
              type="text"
              name="details"
              value={form.details}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
              placeholder="Enter your address"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
              placeholder="Enter your city"
            />
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-main text-white py-3 rounded-lg font-semibold hover:bg-main-dark transition"
          >
            {loading ? "Processing..." : "Place Order (Cash)"}
          </button>
        </form>
      </div>
    </section>
  );
}
