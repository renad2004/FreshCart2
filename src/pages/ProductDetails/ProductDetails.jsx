import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShoppingCart, Heart, Star } from "lucide-react";
import Loading from "../../components/loading/Loading";
import { CartContext } from "../../context/card.context";
import { useWishlist } from "../../context/wishlist.context";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useWishlist()    

  async function getProduct() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProduct(data.data);
      setMainImage(data.data.imageCover);  
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!product) return <Loading />;

 
  return (
    <section className="container  mx-auto my-20 px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Product Images */}
        <div className="flex flex-col items-center">
          {/* Main Image */}
          <img
            src={mainImage}
            alt={product.title}
            className="rounded-xl shadow-md w-96 h-96 object-cover mb-4"
          />

          {/* Thumbnails */}
<div className="flex gap-3 overflow-x-auto">
  {(product.images || []).map((img, i) => (
    <img
      key={i}
      src={img}
      alt={`thumbnail-${i}`}
      className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition ${
        mainImage === img
          ? "border-main ring-2 ring-main"
          : "border-gray-300 hover:border-main"
      }`}
      onClick={() => setMainImage(img)}
    />
  ))}
</div>

        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>

          {/* Rating + Reviews */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-yellow-500 flex gap-1 items-center text-lg">
              <Star /> {product.ratingsAverage}
            </span>
            <span className="text-gray-500">
              ({product.ratingsQuantity} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-5">
            <span className="text-2xl font-bold text-main">
              ${product.price}
            </span>
            {product.priceAfterDiscount && (
              <span className="ml-3 text-gray-500 line-through">
                ${product.priceAfterDiscount}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => addToCart(product.id)}
              className="flex items-center gap-2 bg-main text-white px-6 py-3 rounded-lg shadow hover:bg-main-dark transition"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>

            <button
              onClick={() =>addToWishlist  (product.id)}
             className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
              <Heart size={20} /> Wishlist
            </button>
          </div>

          {/* Extra Info */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Product Details
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
