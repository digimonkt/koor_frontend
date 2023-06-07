import { useEffect, useState } from "react";
import { getUserRightsApi } from "@api/common";
import ShowContent from "@components/showContent";
const TermsCondition = () => {
  const [userRightData, setUserRightData] = useState("");

  const userRights = async () => {
    const response = await getUserRightsApi();
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
    <>
      <ShowContent content={userRightData} />
    </>
  );
};

export default TermsCondition;
