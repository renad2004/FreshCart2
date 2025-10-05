import React, { useEffect, useState } from 'react'
import Card from "../../components/card/card"
import Loading from "../../components/loading/Loading"
import axios from 'axios'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
 export default function Home() {
   const [Products,setProducts]=useState(null)
  async function getAllProduct(){
    const option={
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    }
   const {data} = await axios.request(option)
    // console.log(data.data)
    setProducts(data.data)
  }
  useEffect(()=>{
    getAllProduct()
  },[])
  return (
    <div className='py-5 my-20'>
     {/* HOME slider */}
    <HomeSlider/>

    {/* category slider */}

    <CategorySlider/>

    {/* products */}
    {Products?
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-4'>
      {Products.map((product)=><Card productinfo={product} key={product.id} product={product}/>)}
    </div> :<Loading/>}
 
    </div>
  )
}
