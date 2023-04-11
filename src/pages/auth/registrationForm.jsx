/* eslint-disable no-unused-vars */
import React from "react";
import { CreateUserAPI } from "@api/user";
import { useNavigate } from "react-router-dom";
import { FilledButton } from "@components/button";
import { LabeledInput, LabeledPhoneInput } from "@components/input";
import { USER_ROLES } from "@utils/enum";
import { useFormik } from "formik";
import { validateRegistrationForm } from "./validator";
import { ErrorMessage } from "@components/caption";
import { useSelector } from "react-redux";

function RegistrationForm() {
  // navigate
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      email: "",
      mobileNumber: {
        national: "",
        international: "",
        value: "",
      },
      countryCode: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validateRegistrationForm,
    onSubmit: async (values) => {
      const countryCode = values.mobileNumber.international.split(" ")[0];
      const mobileNumber = (values.mobileNumber.value || "").replace(
        countryCode,
        ""
      );
      const payload = {
        password: values.password,
        role,
      };
      if (values.email) {
        payload.email = values.email;
      }
      if (mobileNumber) {
        payload.mobile_number = mobileNumber;
        payload.country_code = countryCode;
      }
      const res = await CreateUserAPI(payload);
      if (res.remote === "success") {
        if (role === USER_ROLES.jobSeeker) {
          navigate(`/${role}/my-profile/job-criteria`);
        } else {
          navigate(`/${role}/my-profile`);
        }
      } else {
        console.log({ res: res.error.errors });
        formik.setErrors({
          email: res.error.errors.email,
          mobileNumber: res.error.errors.mobile_number,
        });
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
            {formik.touched.email && formik.errors.email ? (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <LabeledPhoneInput
              placeholder="Your Mobile Number"
              title="Mobile"
              onChange={(e) => formik.setFieldValue("mobileNumber", e)}
              defaultCountry={formik.values.countryCode}
              international
              onCountryChange={(e) => formik.setFieldValue("countryCode", e)}
              isInvalidNumber={(isValid) => {
                if (!isValid) {
                  formik.setFieldError("mobileNumber", "Invalid Mobile Number");
                }
              }}
              onBlur={formik.getFieldProps("mobileNumber").onBlur}
              name="mobileNumber"
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
              <ErrorMessage>{formik.errors.mobileNumber}</ErrorMessage>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Password"
              type="password"
              title="Create new password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Re-enter Password"
              title="Repeat your password"
              type="password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <ErrorMessage>{formik.errors.confirmPassword}</ErrorMessage>
            ) : null}
          </div>
          <div className="my-4 text-center">
            <FilledButton title="Register" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
