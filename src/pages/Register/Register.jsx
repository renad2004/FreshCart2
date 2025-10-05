import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"; 

export default function Register() {
  const [loading,setloading]=useState(false)
  const navigate = useNavigate();
  const registerSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(4, "Name must be at least 4 characters")
      .max(20, "Name must be at most 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: registerSchema,
    onSubmit: sendDataToRegister,
  });

  async function sendDataToRegister(values) {

    setloading(true)

    const loadingId = toast.loading('Loading...')


    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      console.log(" Register success:", data);
      setTimeout(() => {
        navigate("/login");
       }, 2000);
      toast.success("Account created successfully!");
    } catch (error) {
      console.error(" Register failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    toast.dismiss(loadingId);
    setloading(false)

  }
  return (
    <div className="py-8 mt-20 p-3 space-y-5">
<h1 className="text-2xl text-main font-bold">
          <FontAwesomeIcon icon={faCircleUser} className="mr-2" />

         Register Form</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="name">UserName:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input bg-slate-100 w-full"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 font-semibold text-sm">{formik.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input bg-slate-100 w-full"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 font-semibold text-sm">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input bg-slate-100 w-full"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 font-semibold text-sm">{formik.errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="rePassword">Confirm Password:</label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input bg-slate-100 w-full"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 font-semibold text-sm">{formik.errors.rePassword}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input bg-slate-100 w-full"
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 font-semibold text-sm">{formik.errors.phone}</p>
          )}
        </div>

        <button disabled={loading} type="submit" className="btn my-4">
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
