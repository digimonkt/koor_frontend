import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LabeledOtpInput } from "@components/input";
import { useFormik } from "formik";
import { FilledButton } from "@components/button";
import { VerifyOtpAPI } from "@api/user";
import urlcat from "urlcat";
import { setUserRole } from "@redux/slice/user";
function VerifyOTPForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams({});

  const { role, verifyEmail } = useSelector((state) => state.auth);
  //   const [loading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      if (role) dispatch(setUserRole(""));
      navigate("/login");
    } else {
      setToken(token);
    }
  }, []);
  useEffect(() => {
    if (!role || !verifyEmail) {
      if (role) dispatch(setUserRole(""));
      navigate("/login");
    }
  }, [role, verifyEmail]);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    // validationSchema: validateLoginForm,
    onSubmit: async (values) => {
      //   setIsLoading(true);
      const payload = {
        token,
        otp: values.otp,
      };
      const res = await VerifyOtpAPI(payload);
      if (res.remote === "success") {
        navigate(urlcat("/reset-password", { token: res.data.token }));
      } else {
        formik.setFieldError("otp", "Invalid or Expired OTP");
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-3">
          <LabeledOtpInput
            title="Enter OTP"
            onChange={(e) => formik.setFieldValue("otp", e)}
            value={formik.values.otp}
          />
          <FilledButton type="submit" title="Submit" />
        </div>
      </form>
    </div>
  );
}

export default VerifyOTPForm;
