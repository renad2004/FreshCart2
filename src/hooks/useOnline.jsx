import { useState } from "react";

export default function useOnline(){
     const [isOnline , setisOnline] = useState(true)
     window.addEventListener('online',function(){
          setisOnline(true)
     })
     window.addEventListener('offline',function(){
          setisOnline(false)
     })
     return {online:isOnline}
}