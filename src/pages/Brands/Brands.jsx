import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Loading from "../../components/loading/Loading"

export default function Brands() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBrands() {
      try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands", {
          params: { limit: 50 }  
        })
        setBrands(data.data)
      } catch (err) {
        setError("Failed to load brands")
      } finally {
        setLoading(false)
      }
    }
    fetchBrands()
  }, [])

  if (loading) return <Loading />
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <section className="p-6 my-20 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Our Brands</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <Link
            to={`/brands/${brand._id}`}
            key={brand._id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition group cursor-pointer"
          >
            <div className="h-32 flex items-center justify-center bg-gray-50">
              <img
                src={brand.image}
                alt={brand.name}
                className="max-h-20 object-contain group-hover:scale-110 transition"
              />
            </div>
            <div className="p-3 text-center">
              <h2 className="text-lg font-semibold text-gray-700 group-hover:text-main transition">
                {brand.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
