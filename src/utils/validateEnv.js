import { cleanEnv, str } from "envalid";
const env = cleanEnv(process.env, {
  REACT_APP_BACKEND_URL: str(),
  REACT_APP_GOOGLE_API_KEY: str({ default: "" }),
});

export default env;
