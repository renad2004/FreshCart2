import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function VerifyResetCode() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: sendCodeToVerify,
  });

  async function sendCodeToVerify(values) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      console.log("Verify Success: ", data);

      toast.success("Code verified successfully!");
      setTimeout(() => {
        navigate("/resetPassword");  
      }, 2000);
    } catch (error) {
      console.error("Verify Error", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Invalid reset code");
    }
  }

  return (
    <div className="py-8 mt-10 p-3 space-y-5">
      <h1 className="text-2xl text-main font-bold">
          <FontAwesomeIcon icon={faCircleUser} className="mr-2" />
          Verify Reset Code</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="resetCode">Enter Reset Code:</label>
          <input
            type="text"
            id="resetCode"
            name="resetCode"
            required
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            className="input bg-slate-100 w-full"
          />
        </div>

        <button type="submit" className="btn my-4 ">
          Verify Code
        </button>
      </form>
    </div>
  );
}
