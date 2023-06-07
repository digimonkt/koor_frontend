import { useEffect, useState } from "react";
import { getPrivacyApi } from "@api/common";
import ShowContent from "@components/showContent";

const PrivacyPolicy = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState("");

  const userRights = async () => {
    const response = await getPrivacyApi();
    if (response.remote === "success") {
      setPrivacyPolicy(response.data.description);
    }
  };
  useEffect(() => {
    userRights();
  }, []);
  return (
    <>
      <ShowContent content={privacyPolicy} />
    </>
  );
};

export default PrivacyPolicy;
