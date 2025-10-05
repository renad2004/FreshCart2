import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ResetPassword() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: sendNewPassword,
  });

  async function sendNewPassword(values) {
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      console.log("Reset Password Success: ", data);

      toast.success("Password reset successfully!");
      setTimeout(() => {
        navigate("/login");  
      }, 2000);
    } catch (error) {
      console.error("Reset Password Error", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="py-8 p-3 mt-10 space-y-5">
      <h1 className="text-2xl text-main font-bold">
     <FontAwesomeIcon icon={faCircleUser} className="mr-2" />
          Reset Password</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Email */}
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

        {/* New Password */}
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            required
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            className="input bg-slate-100 w-full"
          />
        </div>

        <button type="submit" className="btn my-4 ">
          Reset Password
        </button>
      </form>
    </div>
  );
}
