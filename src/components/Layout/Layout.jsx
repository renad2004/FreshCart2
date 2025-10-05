import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import TitleManager from "../TitleManager/TitleManager";
export default function Layout() {
  return (
     <>
      <Navbar />
      <div className="container">
        <TitleManager /> 
      <Outlet />  
      </div>
      <Footer/>
   </>
  )
}
