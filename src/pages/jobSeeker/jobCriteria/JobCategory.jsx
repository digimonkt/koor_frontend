import { OutlinedButton } from "@components/button";
import { Checkbox, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import { stepContents } from "./ProfileHelper";

const StepCheckMarks = ({ options, title, id }) => {
  const [showContent, setShowContent] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [currentSelected, setCurrentSeleted] = useState(new Set());
  useEffect(() => {
    let isPresent = true;
    for (let i = 0; i < options.length; i++) {
      if (currentSelected.has(options[i].id)) {
        continue;
      } else {
        isPresent = false;
        break;
      }
    }
    if (!isPresent) setIsAllSelected(false);
    else setIsAllSelected(true);
  }, [currentSelected, options]);

  return (
    <div className="according-content-box border-top py-3">
      <Stack direction="row" spacing={2} alignItems="center">
        <CheckBox
          onChange={(e) => {
            setShowContent(true);
            setIsAllSelected(e.target.checked);
            if (e.target.checked) {
              const newSet = new Set(currentSelected);
              options.forEach((option) => newSet.add(option.id));
              setCurrentSeleted(newSet);
            } else {
              setCurrentSeleted(new Set());
            }
          }}
          value={isAllSelected}
        />
        <h2 className="mb-0">{title}</h2>
        <span
          className={`ms-auto arrow-color ${showContent ? "active" : null}`}
          onClick={() => setShowContent(!showContent)}
        >
          <SVG.ArrowUpIcon />
        </span>
      </Stack>
      {showContent ? (
        <div className="according-content">
          <ul>
            {options.map((option) => {
              return (
                <li key={option.id}>
                  <CheckBox
                    value={currentSelected.has(option.id)}
                    onChange={(e) => {
                      const newSet = new Set(currentSelected);
                      if (newSet.has(option.id)) {
                        newSet.delete(option.id);
                      } else {
                        newSet.add(option.id);
                      }
                      setCurrentSeleted(newSet);
                    }}
                  />
                  <span className="ms-2">{option.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const CheckBox = ({ onChange, value }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Checkbox
      icon={<SVG.UncheckIcon />}
      checkedIcon={<SVG.CheckBoxIcon />}
      checked={value}
      onChange={(e) => {
        if (onChange) {
          onChange(e);
        }
      }}
      {...label}
      sx={{
        color: "#CACACA",
        transition: "all 0.5s ease-out",
        padding: "0px",
        "&.Mui-checked": {
          color: "#EEA23D",
          transition: "all 0.5s ease-out",
        },
      }}
    />
  );
};

const JobCategory = ({ handleNext }) => {
  return (
    <div className="p-3">
      {stepContents.map((item) => {
        return <StepCheckMarks key={item.id} {...item} />;
      })}

      <div className="text-center border-top pt-5">
        <OutlinedButton
          title={
            <>
              Next{" "}
              <span className="ms-2">
                <SVG.StartIcon />
              </span>
            </>
          }
          onClick={handleNext}
          sx={{
            "&.MuiButton-outlined": {
              border: "1px solid #EEA23D !important",
              color: "#EEA23D !important",
              fontWeight: "500",
              fontSize: "16px",
              padding: "10px 30px",
              "&:hover": {
                background: "rgba(255, 165, 0, 0.1)",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default JobCategory;
