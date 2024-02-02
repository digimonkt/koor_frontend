import ForgotPasswordForm from "./forgotPassword";
import AuthLayout from "./layout";
import LoginForm from "./loginForm";
import LogoutForm from "./logout";
import RegistrationForm from "./registrationForm";
import ResetPasswordComponent from "./resetPassword";
import VerifyOTPForm from "./verifyOTPForm";
import ActivatioinUser from "./activationuser";
const registration = {
  title: "Register",
  subTitle: "I want to register as...",
  selectedRoleTitle: "Register as @role",
  children: <RegistrationForm />,
  btnTitle: "Register",
  isRoleSelection: true,
  options: true,
};
const login = {
  title: "Login",
  subTitle: "Log in to Koor as...",
  selectedRoleTitle: "Log in as @role",
  children: <LoginForm />,
  btnTitle: "Login",
  isRoleSelection: true,
  options: true,
};
const forgotPassword = {
  title: "Forget Password",
  subTitle: "Forget Password of...",
  selectedRoleTitle: "Forgot password?",
  children: <ForgotPasswordForm />,
  isRoleSelection: true,
  options: false,
};
const verifyOTP = {
  title: "Verify OTP",
  subTitle: "Forget Password of...",
  selectedRoleTitle: "OTP is sent to @email",
  children: <VerifyOTPForm />,
  isRoleSelection: false,
  options: false,
};
const activeAcount = {
  title: "Active Account",
  subTitle: "Verify Your Account...",
  selectedRoleTitle:
    "We have sent you an activation email. Please click on the activation button. If you have not received the activation link yet, please click on the resend button",
  children: <ActivatioinUser />,
  isRoleSelection: false,
  options: false,
};

const resetPassword = {
  title: "Reset Password",
  selectedRoleTitle: "Create a new password",
  children: <ResetPasswordComponent />,
  isRoleSelection: false,
  options: false,
};
export const Registration = AuthLayout(registration);
export const Login = AuthLayout(login);
export const ForgotPassword = AuthLayout(forgotPassword);
export const VerifyOTP = AuthLayout(verifyOTP);
export const ActiveAcount = AuthLayout(activeAcount);
export const ResetPassword = AuthLayout(resetPassword);
export const Logout = LogoutForm;
