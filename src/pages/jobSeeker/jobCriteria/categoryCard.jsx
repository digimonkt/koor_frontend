import { Capacitor } from "@capacitor/core";
import { SVG } from "../../../assets/svg";
import { CheckboxInput } from "../../../components/input";
import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";

function CategoryCard({ item, handleSelectedCategories }) {
  const platform = Capacitor.getPlatform();
  const [showOptions, setShowOptions] = useState(true);
  const [isAllSubCategoriesSelected, setIsAllSubCategoriesSelected] =
    useState(false);
  const handleShowOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleSelect = (id, checked) => {
    handleSelectedCategories({ [id]: checked });
  };
  const handleSelectAll = (checked) => {
    const categoriesStatus = {};
    for (let i = 0; i < item.subCategories.length; i++) {
      categoriesStatus[item.subCategories[i].id] = checked;
    }
    handleSelectedCategories(categoriesStatus);
    setIsAllSubCategoriesSelected(true);
  };

  useEffect(() => {
    let isAllSelected = true;
    for (let i = 0; i < item.subCategories.length; i++) {
      const subCategory = item.subCategories[i];
      if (!subCategory.status) {
        isAllSelected = false;
        break;
      }
    }
    setIsAllSubCategoriesSelected(isAllSelected);
  }, [item]);

  return (
    <div
      className={`according-content-box py-3 ${
        platform === "android" || platform === "ios" ? "pt-0" : "border-top"
      }`}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          marginBottom:
            platform === "android" || platform === "ios" ? "10px" : "",
        }}
      >
        <CheckboxInput
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={isAllSubCategoriesSelected}
        />
        <h2 className="mb-0">{item.title}</h2>
        <span
          style={{ cursor: "pointer" }}
          className={`ms-auto arrow-color ${showOptions ? "active" : null}`}
          onClick={handleShowOptions}
        >
          <SVG.Downarrow />
        </span>
      </Stack>
      {showOptions && (
        <div className="according-content">
          <ul>
            {item.subCategories.map((subCategory) => {
              return (
                <li key={subCategory.id}>
                  <label
                    htmlFor={`checkbox-${subCategory.id}`}
                    style={{ cursor: "pointer" }}
                  >
                    <CheckboxInput
                      id={`checkbox-${subCategory.id}`}
                      onChange={(e) =>
                        handleSelect(subCategory.id, e.target.checked)
                      }
                      checked={subCategory.status}
                    />
                    <span className="ms-2">{subCategory.title}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CategoryCard;
