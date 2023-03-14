import { ResetPasswordAPI } from "@api/user";
import { FilledButton } from "@components/button";
import { ErrorMessage } from "@components/caption";
import { LabeledInput } from "@components/input";
import Loader from "@components/loader";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { setUserRole } from "@redux/slice/user";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { validateResetPasswordForm } from "./validator";

function ResetPasswordComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams({});
  const { role, verifyEmail } = useSelector((state) => state.auth);

  const [token, setToken] = useState("");
  const [loading, setIsLoading] = useState(false);

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
      password: "",
      confirmPassword: "",
    },
    validationSchema: validateResetPasswordForm,
    onSubmit: async (values) => {
      setIsLoading(true);
      const payload = {
        password: values.password,
      };
      const res = await ResetPasswordAPI(payload, token);
      if (res.remote === "success") {
        if (role) dispatch(setUserRole(""));
        dispatch(setSuccessToast("Password updated successfully"));
        navigate("/login");
      } else {
        dispatch(setErrorToast("Something went wrong"));
      }
      setIsLoading(false);
    },
  });
  return (
    <>
      <div className="form-content">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="New Password"
              type="password"
              disabled={loading}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Re-type Password"
              type="password"
              disabled={loading}
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <ErrorMessage>{formik.errors.confirmPassword}</ErrorMessage>
            ) : null}
          </div>
          <div className="my-4 text-center">
            <FilledButton
              type="submit"
              title={loading ? <Loader loading={loading} /> : "Update Password"}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetPasswordComponent;
