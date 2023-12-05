import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { FilledButton } from "../../components/button";
import { ResentActivation, VerifyAcountAPI } from "../../api/user";
import urlcat from "urlcat";
import { setUserRole } from "@redux/slice/user";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import Loader from "@components/loader";
import { validateMailForm } from "./validator";
import { Box } from "@mui/material";

function ActivatioinUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams({});
  const { role, verifyEmail } = useSelector(state => state.auth);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [, setToken] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      if (role) dispatch(setUserRole(""));
      // navigate("/register");
    } else {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (!role || !verifyEmail) {
      if (role) dispatch(setUserRole(""));
      // navigate("/register");
    }
  }, [role, verifyEmail]);

  const formik = useFormik({
    initialValues: {
      hash_code: "",
    },
    validationSchema: validateMailForm,
    onSubmit: async values => {
      const payload = {
        hash_code: values.otp,
      };
      const res = await VerifyAcountAPI(payload);
      if (res.remote === "success") {
        navigate(urlcat("", { token: res.data.token }));
      } else {
        formik.setFieldError("otp", "Invalid or Expired OTP");
      }
    },
  });

  const handleResendOTP = async () => {
    setSendingOTP(true);
    const payload = {
      email: verifyEmail,
    };
    const res = await ResentActivation(payload);
    if (res.remote === "success") {
      setSendingOTP(false);
      dispatch(setSuccessToast("Mail send successfully"));
    } else {
      dispatch(setErrorToast("Network Error! Try again"));
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-3 enterotp_input">
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <FilledButton
              type="button"
              onClick={handleResendOTP}
              title={
                sendingOTP ? <Loader loading={sendingOTP} /> : "Resend Mail"
              }
            />
          </Box>
        </div>
      </form>
    </div>
  );
}

export default ActivatioinUser;
