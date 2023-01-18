import AuthLayout from "./layout";
const registration = {
  title: "Register",
  subTitle: "I want to register as...",
};
const login = {
  title: "Login",
  subTitle: "Log in to Koor as...",
};
export const Registration = AuthLayout(registration);
export const Login = AuthLayout(login);
