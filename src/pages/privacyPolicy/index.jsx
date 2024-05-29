import { useEffect, useState } from "react";
import { getPrivacyAPI } from "../../api/common";
import ShowContent from "../../components/showContent";

const PrivacyPolicy = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState("");

  const userRights = async () => {
    const response = await getPrivacyAPI();
    if (response.remote === "success") {
      setPrivacyPolicy(response.data.description);
    }
  };
  useEffect(() => {
    userRights();
  }, []);
  return (
    <div style={{ textAlign: "justify", border: "2px solid black" }}>
      <ShowContent content={privacyPolicy} />
    </div>
  );
};

export default PrivacyPolicy;
