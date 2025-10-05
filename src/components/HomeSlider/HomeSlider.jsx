import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import 'swiper/css'
import HomeSlider1 from "../../assets/images/slider-image-1.jpeg"
import HomeSlider2 from "../../assets/images/slider-image-2.jpeg"
import HomeSlider3 from "../../assets/images/slider-image-3.jpeg"
export default function HomeSlider() {
return (
     <div className='grid grid-cols-12 gap-2'>
      {/* Main Slider */}
     <div className='col-span-12 md:col-span-8'>
     <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{delay: 1500}}
     >
          <SwiperSlide>
          <img className="h-140 object-cover" src={HomeSlider1} alt="Slider 1"/>
          </SwiperSlide>
          <SwiperSlide>
          <img className="h-140 object-cover" src={HomeSlider2} alt="Slider 2"/>
          </SwiperSlide>
          <SwiperSlide>
          <img className="h-140 object-cover" src={HomeSlider3} alt="Slider 3"/>
          </SwiperSlide>
     </Swiper>
     </div>
      {/* Side Images */}
     <div className='col-span-12 md:col-span-4 grid grid-rows-2 gap-1'>
     <img className="w-full h-full object-cover" src={HomeSlider2} alt="Side 1" />
     <img className="w-full h-full object-cover" src={HomeSlider3} alt="Side 2" />
     </div>
</div>
)
}