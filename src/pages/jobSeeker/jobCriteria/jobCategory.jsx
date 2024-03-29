import { OutlinedButton } from "../../../components/button";
import React, { useEffect, useState } from "react";
import { SVG } from "../../../assets/svg";
import {
  GetJobSeekerCategoriesAPI,
  UpdateJobSeekerCategoriesAPI,
} from "../../../api/jobSeeker";
import CategoryCard from "./categoryCard";
import { Capacitor } from "@capacitor/core";

const JobCategory = ({ handleNext }) => {
  const platform = Capacitor.getPlatform();
  const [allCategories, setAllCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState({});
  const [updating, setUpdating] = useState(false);
  const getJobSeekerCategories = async () => {
    const res = await GetJobSeekerCategoriesAPI();
    if (res.remote === "success") {
      setAllCategories(res.data);
      const selectedSubCategories = {};
      for (let i = 0; i < res.data.length; i++) {
        const subCategories = res.data[i].subCategories;
        for (let j = 0; j < subCategories.length; j++) {
          const subCategory = subCategories[j];
          selectedSubCategories[subCategory.id] = subCategory.status;
        }
      }
      setSelectedSubCategories(selectedSubCategories);
    }
  };
  const handleSelectedCategories = (data) => {
    setSelectedSubCategories((prevState) => {
      const newData = { ...prevState, ...data };
      const newAllCategories = allCategories.map((category) => {
        return {
          ...category,
          subCategories: category.subCategories.map((subCategory) => {
            return {
              ...subCategory,
              status: newData[subCategory.id] || false,
            };
          }),
        };
      });
      setAllCategories(newAllCategories);
      return newData;
    });
  };

  const handleUpdateCategories = async () => {
    setUpdating(true);
    const payload = new FormData();
    for (const key in selectedSubCategories) {
      if (selectedSubCategories[key]) {
        payload.append("category", key);
      }
    }
    await UpdateJobSeekerCategoriesAPI(payload);
    setUpdating(false);
    handleNext();
  };

  useEffect(() => {
    getJobSeekerCategories();
  }, []);
  return (
    <div className="p-3">
      {allCategories.map((item) => {
        return (
          <CategoryCard
            key={item.id}
            item={item}
            handleSelectedCategories={handleSelectedCategories}
          />
        );
      })}
      {platform === "android" || platform === "ios" ? null : (
        <div className="text-center border-top pt-3">
          <OutlinedButton
            title={
              <>
                {updating ? (
                  "Saving..."
                ) : (
                  <>
                    Next
                    <span className="ms-2">
                      <SVG.StartIcon />
                    </span>
                  </>
                )}
              </>
            }
            onClick={handleUpdateCategories}
            disabled={updating}
            sx={{
              "&.MuiButton-outlined": {
                border: "1px solid #EEA23D !important",
                padding: "10px 30px 8px 30px !important",
                color: "#EEA23D !important",
                fontWeight: "500",
                fontSize: "16px !important",
                "@media(max-width: 480px)": {
                  fontSize: "14px !important",
                },
                "&:hover": {
                  background: "rgba(255, 165, 0, 0.1)",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default JobCategory;
