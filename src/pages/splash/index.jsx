import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SplashScreen } from "@capacitor/splash-screen";

const Spalsh = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const hidefun = async () => {
      await SplashScreen.show({
        showDuration: 5000,
        autoHide: true,
      });
    };
    hidefun();
    navigate("/login");
  }, []);
  return <></>;
};
export default Spalsh;
