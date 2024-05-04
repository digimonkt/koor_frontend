import { useEffect, useState } from "react";
import { getUserRightsAPI } from "../../api/common";
import ShowContent from "../../components/showContent";
const TermsCondition = () => {
  const [userRightData, setUserRightData] = useState("");

  const userRights = async () => {
    const response = await getUserRightsAPI();
    if (response.remote === "success") {
      setUserRightData(response.data.description);
    } else {
      console.log(response.error);
    }
  };
  useEffect(() => {
    userRights();
  }, []);
  return (
    <div style={{ textAlign: "justify", border: "2px solid black" }}>
      <ShowContent content={userRightData} />
    </div>
  );
};

export default TermsCondition;
