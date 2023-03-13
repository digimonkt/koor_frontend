import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LabeledOtpInput } from "@components/input";
import { useFormik } from "formik";
import { FilledButton } from "@components/button";
function VerifyOTPForm() {
  const navigate = useNavigate();
  const { role, verifyEmail } = useSelector((state) => state.auth);
  //   const [loading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    // validationSchema: validateLoginForm,
    onSubmit: async (values) => {
      //   setIsLoading(true);
      console.log(values);
    },
  });

  useEffect(() => {
    if (!role || !verifyEmail) {
      console.log({ role, verifyEmail, cond: !role || !verifyEmail });
      navigate("/login");
    }
  }, [role, verifyEmail]);
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
