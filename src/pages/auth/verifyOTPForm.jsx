import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LabeledOtpInput } from "../../components/input";
import { useFormik } from "formik";
import { FilledButton } from "../../components/button";
import { SendOtpAPI, VerifyOtpAPI } from "../../api/user";
import urlcat from "urlcat";
import { setUserRole } from "@redux/slice/user";
import { ErrorMessage } from "@components/caption";
import { setSuccessToast } from "@redux/slice/toast";
import Loader from "@components/loader";
import { validateOTPForm } from "./validator";
import { Box } from "@mui/material";
function VerifyOTPForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams({});

  const { role, verifyEmail } = useSelector((state) => state.auth);
  const [sendingOTP, setSendingOTP] = useState(false);
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
    validationSchema: validateOTPForm,
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
  const handleResendOTP = async () => {
    setSendingOTP(true);
    const payload = {
      email: verifyEmail,
      role,
    };
    const res = await SendOtpAPI(payload);
    if (res.remote === "success") {
      setSendingOTP(false);
      dispatch(setSuccessToast("OTP send successfully"));
    } else {
      dispatch(setSuccessToast("Network Error! Try again"));
    }
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-3 enterotp_input">
          <LabeledOtpInput
            title="Enter OTP"
            onChange={(e) => formik.setFieldValue("otp", e)}
            value={formik.values.otp}
          />
          <Box sx={{ marginBottom: "10px" }}>
            {formik.errors.otp ? (
              <ErrorMessage>{formik.errors.otp}</ErrorMessage>
            ) : null}
          </Box>
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <FilledButton
              type="submit"
              title="Submit"
              style={{ marginRight: "10px" }}
            />
            <FilledButton
              type="button"
              onClick={handleResendOTP}
              title={
                sendingOTP ? <Loader loading={sendingOTP} /> : "Resend OTP"
              }
            />
          </Box>
        </div>
      </form>
    </div>
  );
}

export default VerifyOTPForm;
