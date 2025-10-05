// ForgotPassword.jsx
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"; 
 
export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  

  const schema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: sendForgotRequest,
  });

  async function sendForgotRequest(values) {
    setLoading(true);
    const loadingId = toast.loading("Sending request...");

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values,
        { headers: { "Content-Type": "application/json" } }
      );

       toast.success(data.message || "Reset email sent — check your inbox");
       setTimeout(() => navigate("/verifyCode"), 3000);
      formik.resetForm();
    } catch (err) {
      console.error("Forgot password error:", err.response?.data || err.message);
      const serverMessage = err.response?.data?.message || "Something went wrong";
      toast.error(serverMessage);
    } finally {
      toast.dismiss(loadingId);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md my-25 mx-auto  p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl text-main font-bold">
            <FontAwesomeIcon icon={faCircleUser} className="mr-2" />
          Forgot Password</h1>
      <p className="text-sm text-gray-600 my-6">
        Enter your email and we'll send you instructions to reset your password.
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="you@example.com"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-main hover:bg-green-700"
          }`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-600">
        <button
          onClick={() => navigate(-1)}
          className="underline"
          type="button"
        >
          Back
        </button>
      </div>
    </div>
  );
}
