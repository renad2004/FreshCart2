import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../loading/Loading"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay } from "swiper/modules"

export default function CategorySlider() {
  const [categories, setCategories] = useState([])

  async function getAllCategories() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      setCategories(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <div className="my-10">
      {categories.length > 0 ? (
        <Swiper slidesPerView={5} 
        spaceBetween={6} 
          modules={[Autoplay]}
          loop={true}
          autoplay={{delay: 1500}}>
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="text-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-32 h-32 object-cover mx-auto rounded-full"
                />
                <p className="mt-2  font-semibold">{category.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Loading />
      )}
    </div>
  )
}
