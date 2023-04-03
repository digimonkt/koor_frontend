import { Loader } from "@googlemaps/js-api-loader";
import env from "@utils/validateEnv";
import { useEffect, useState } from "react";

const Status = {
  LOADING: "LOADING",
  FAILURE: "FAILURE",
  SUCCESS: "SUCCESS",
};
const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

const Wrapper = ({ children, callback, ...options }) => {
  const [status, setStatus] = useState(Status.LOADING);

  useEffect(() => {
    const loader = new Loader({
      ...(options || {}),
      apiKey: env.REACT_APP_GOOGLE_API_KEY,
    });

    const setStatusAndExecuteCallback = (status) => {
      if (callback) callback(status, loader);
      setStatus(status);
    };

    setStatusAndExecuteCallback(Status.LOADING);

    loader.load().then(
      () => setStatusAndExecuteCallback(Status.SUCCESS),
      () => setStatusAndExecuteCallback(Status.FAILURE)
    );
  }, []);

  if (status === Status.SUCCESS && children) return <>{children}</>;

  if (render) return render(status);

  return <>{children}</>;
};
export default Wrapper;
