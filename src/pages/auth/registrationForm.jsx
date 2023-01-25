import React, { useState } from "react";
import { CreateUserAPI } from "../../api/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FilledButton } from "../../components/button";
import { LabeledInput } from "../../components/input";
import { setIsLoggedIn } from "../../redux/slice/user";
import { USER_ROLES } from "../../utils/enum";
import { useFormik } from "formik";
import { validateRegistrationForm } from "./validator";
import { ErrorMessage } from "../../components/caption";

function RegistrationForm({ role }) {
  // navigate
  const navigate = useNavigate();
  // redux dispatcher
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [formErrors, setFormErrors] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [form, setForm] = useState({
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validateRegistrationForm,
    onSubmit: async (values) => {
      const payload = {
        email: values.email,
        mobileNumber: values.mobileNumber,
        password: values.password,
        role,
      };
      const res = await CreateUserAPI(payload);
      if (res.remote === "success") {
        dispatch(setIsLoggedIn(true));
        navigate(`/${role}/my-profile/job-criteria`);
      } else {
        console.log({ res });
      }
    },
  });

  return (
    <div>
      <div className="form-content">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Email"
              title="Email"
              subtitle="No email? Register with mobile number!"
              type="email"
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          ) : null}
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Mobile Number"
              title="Mobile"
              type="number"
              {...formik.getFieldProps("mobileNumber")}
            />
          </div>
          {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
            <ErrorMessage>{formik.errors.mobileNumber}</ErrorMessage>
          ) : null}
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Password"
              type="password"
              title="Create new password"
              {...formik.getFieldProps("password")}
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          ) : null}
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Re-enter Password"
              title="Repeat your password"
              type="password"
              {...formik.getFieldProps("confirmPassword")}
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <ErrorMessage>{formik.errors.confirmPassword}</ErrorMessage>
          ) : null}
          <div className="my-4 text-center">
            <FilledButton
              title="Register"
              isBlueButton={role !== USER_ROLES.jobSeeker}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
