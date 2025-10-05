import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../../components/loading/Loading"
import { Link } from "react-router-dom"

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // filters
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword, setDebouncedKeyword] = useState("") // 🆕
  const [sort, setSort] = useState("")
  const [category, setCategory] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  // ⏳ Debounce keyword
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword)
      setPage(1)  
    }, 2500)

    return () => clearTimeout(handler)
  }, [keyword])

  async function fetchProducts() {
    setLoading(true)
    try {
      const params = {
        page,
        limit: 12,
      }

      if (sort) params.sort = sort
      if (debouncedKeyword) params.keyword = debouncedKeyword
      if (category) params.category = category
      if (minPrice) params["price[gte]"] = minPrice
      if (maxPrice) params["price[lte]"] = maxPrice

      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products",
        { params }
      )

      setProducts(data.data)
      setTotalPages(data.metadata?.numberOfPages || 1)
      setError(null)
    } catch (err) {
      setError("⚠️ Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, debouncedKeyword, category, minPrice, maxPrice]) // 🆕 استخدم debouncedKeyword

  if (loading) return <Loading />
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <section className="p-6 my-30 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* 🔍 Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">Sort By</option>
          <option value="price">Price (Low → High)</option>
          <option value="-price">Price (High → Low)</option>
          <option value="-ratingsAverage">Top Rated</option>
        </select>

         
        
      </div>

      {/* 🛒 Products Grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link
              to={`/productDetails/${p._id}`}
              key={p._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={p.imageCover}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {p.title}
                </h2>
                <p className="text-main font-bold">EGP {p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 📌 Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-md ${
              page === i + 1
                ? "bg-main text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  )
}
