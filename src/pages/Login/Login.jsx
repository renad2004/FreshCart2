import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"; 
import { Eye, EyeOff } from "lucide-react";    
import { useContext, useState } from "react";
import { TokenContext } from "../../context/Token.context";

export default function Login() {
  const [passType, setPassType] = useState("password");
  const navigate = useNavigate();  
  const {setToken} = useContext(TokenContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendDataToLogin,
  });

  async function sendDataToLogin(values) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log("Login Success ", data);
      if(data.message =="success"){
  localStorage.setItem("token", data.token);
      setToken(data.token)
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/home");  
      }, 2000);
      }
     
    } catch (error) {
      console.error("Login Error", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="p-3 py-13 mt-10 space-y-5">
      <h1 className="text-2xl text-main font-bold">
        <FontAwesomeIcon icon={faCircleUser} className="mr-2" />
        Login Form
      </h1>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            className="input bg-slate-100 w-full"
          />
        </div>

        <div className="relative"> 
          <label htmlFor="password">Password:</label>
          <input
            type={passType}
            id="password"
            name="password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            className="input bg-slate-100 w-full"
          />

           {passType === "password" ? (
            <EyeOff
              className="absolute text-main right-5 top-[75%] transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPassType("text")}
            />
          ) : (
            <Eye
              className="absolute text-main right-5 top-[75%] transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPassType("password")}
            />
          )}
        </div>

        {/* Forgot Password link */}
        <div className="text-right mt-2">
          <Link 
            to="/forgot-password" 
            className="text-sm text-main hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="btn my-4">
          Login
        </button>
      </form>
    </div>
  );
}
