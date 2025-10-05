import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Loading from "../../components/loading/Loading"
import Card from "../../components/card/card"

export default function BrandDetails() {
  const { id } = useParams()
  const [brand, setBrand] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBrandDetails() {
      try {
        // ✅ Get brand details
        const { data: brandRes } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/brands/${id}`
        )
        setBrand(brandRes.data)

        // ✅ Get products of this brand
        const { data: productsRes } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products`,
          {
            params: { brand: id }, // ممكن تختلف حسب الـ API، جربي كده
          }
        )
        setProducts(productsRes.data)
      } catch (err) {
        setError("Failed to load brand details")
      } finally {
        setLoading(false)
      }
    }
    fetchBrandDetails()
  }, [id])

  if (loading) return <Loading />
  if (error) return <p className="text-center text-red-500">{error}</p>

  if (!brand) {
    return <p className="text-center text-gray-500">No brand details available.</p>
  }

  return (
    <section className="p-6 my-20 max-w-7xl mx-auto">
      {/* Brand Info */}
      <div className="bg-white shadow-lg rounded-xl p-8 text-center mb-10">
        <img
          src={brand.image}
          alt={brand.name}
          className="mx-auto w-40 h-40 object-contain mb-6"
        />
        <h1 className="text-3xl font-bold text-main mb-2">{brand.name}</h1>
        <p className="text-gray-600">
          {products.length} products available from this brand.
        </p>
      </div>

      {/* Brand Products */}
      {products.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product._id} productinfo={product} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found for this brand.</p>
      )}

      {/* Back button */}
      <div className="mt-10 text-center">
        <Link
          to="/brands"
          className="bg-main text-white px-6 py-2 rounded-lg hover:bg-main-dark transition"
        >
          Back to Brands
        </Link>
      </div>
    </section>
  )
}
