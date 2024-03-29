import { cleanEnv, str } from "envalid";
const env = cleanEnv(process.env, {
  REACT_APP_BACKEND_URL: str(),
  REACT_APP_WS_BACKEND_URL: str(),
  REACT_APP_GOOGLE_API_KEY: str({ default: "" }),
  REACT_APP_CUSTOM_DOMAIN: str({ default: "" }),
});

export default env;
