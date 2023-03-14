import { SendOtpAPI } from "@api/user";
import { FilledButton } from "@components/button";
import { ErrorMessage } from "@components/caption";
import { LabeledInput } from "@components/input";
import Loader from "@components/loader";
import { setSuccessToast } from "@redux/slice/toast";
import { setVerifyEmail } from "@redux/slice/user";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateForgotPasswordForm } from "./validator";
import urlcat from "urlcat";

function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validateForgotPasswordForm,
    onSubmit: async (values) => {
      setIsLoading(true);
      const payload = {
        email: values.email,
      };
      const res = await SendOtpAPI(payload);
      if (res.remote === "success") {
        setIsLoading(false);
        dispatch(setSuccessToast(res.data.message));
        dispatch(setVerifyEmail(payload.email));
        navigate(urlcat("/verify-otp", { token: res.data.token }));
      } else {
        setIsLoading(false);
        formik.setErrors({ email: "Email not found" });
      }
    },
  });
  return (
    <>
      <div className="form-content">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Email"
              type="email"
              disabled={loading}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            ) : null}
            <div className="my-4 text-center">
              <FilledButton
                type="submit"
                title={
                  loading ? <Loader loading={loading} /> : "Forget Password"
                }
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgotPasswordForm;
