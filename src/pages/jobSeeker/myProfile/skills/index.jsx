import { Card, CardContent, Chip, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import { getSkills } from "@redux/slice/choices";
import { OutlinedButton } from "@components/button";
import { useDebounce } from "usehooks-ts";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import NoItem from "../noItem";
import { addSkillsDetailsAPI } from "@api/jobSeeker";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import Loader from "@components/loader";

const Skills = () => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.choices);
  const {
    currentUser: { skills: selectedSkills },
  } = useSelector((state) => state.auth);
  const [searchSkill, setSearchSkill] = useState("");
  const debouncedSearchSkillValue = useDebounce(searchSkill, 500);
  const [newSelectedSkills, setNewSelectedSkills] = useState([]);
  const [removedSkills, setRemovedSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleClick = (skill) => {
    setSearchSkill("");
    setNewSelectedSkills((prevState) => [...prevState, skill]);
    setAllSkills((prevState) => [...prevState, skill]);
  };
  const handleDelete = (id) => {
    setRemovedSkills((prevState) => [...prevState, id]);
    setAllSkills((prevState) => prevState.filter((state) => state.id !== id));
    setNewSelectedSkills((prevState) =>
      prevState.filter((state) => state.id !== id)
    );
  };

  const updateSkills = async () => {
    setLoading(true);
    const payload = {
      skill_add: newSelectedSkills.map((skill) => skill.id),
      skill_remove: removedSkills,
    };
    const res = await addSkillsDetailsAPI(payload);
    if (res.remote === "success") {
      dispatch(setSuccessToast("Skills updated successfully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedSkills) {
      setAllSkills((prevState) => [
        ...selectedSkills.map((skill) => ({
          id: skill.id,
          title: skill.skill.title,
        })),
      ]);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchSkillValue) {
      dispatch(
        getSkills({
          search: debouncedSearchSkillValue,
        })
      );
    }
  }, [debouncedSearchSkillValue]);

  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "25px",
            },
          }}
        >
          <div className="add-content">
            <h2>Skills</h2>
            <p>Maximum 15 skills</p>
            <Stack direction="row" spacing={0} flexWrap="wrap">
              {allSkills.length ? (
                allSkills.map((item, index) => (
                  <Chip
                    key={index}
                    label={item.title}
                    onDelete={() => handleDelete(item.id)}
                    deleteIcon={<SVG.CancelIcon />}
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Poppins",
                      color: "#121212",
                      fontWeight: "400",
                      padding: "5px 10px 5px 20px",
                      margin: "0px 8px 8px 0px",
                    }}
                  />
                ))
              ) : (
                <NoItem
                  icon={<SVG.SkillsIcon />}
                  description={
                    <p>
                      List your skills that you think will be useful for a jobs
                      you’re looking for. Highlight your strengths and remember
                      to be honest.
                    </p>
                  }
                />
              )}
            </Stack>

            {allSkills.length <= 15 && (
              <div className="skills-input mt-3">
                <input
                  type="text"
                  placeholder="Start typing a skill to add a new one"
                  onChange={(e) => setSearchSkill(e.target.value)}
                  value={searchSkill}
                />
                {debouncedSearchSkillValue && searchSkill && (
                  <div className={styles.search_results_box}>
                    {skills.data
                      .filter(
                        (skill) =>
                          !allSkills.some(
                            (otherItem) => otherItem.title === skill.title
                          )
                      )
                      .map((skill) => {
                        return (
                          <div
                            key={skill.id}
                            className={styles.search_results}
                            onClick={() => handleClick(skill)}
                          >
                            {skill.title}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            )}
            <div className="text-center mt-4">
              <OutlinedButton
                title={
                  <>
                    {loading ? (
                      <Loader loading={loading} style={{ color: "#EEA23D" }} />
                    ) : (
                      <>
                        <span className="me-2 d-inline-flex">
                          <SVG.SaveFile />
                        </span>
                        Update Skills
                      </>
                    )}
                  </>
                }
                onClick={updateSkills}
                sx={{
                  "&.MuiButton-outlined": {
                    border: "1px solid #EEA23D !important",
                    color: "#EEA23D !important",
                    fontWeight: "500",
                    fontSize: "16px",
                    padding: "6px 30px",

                    "&:hover": { background: "#eea23d14" },
                    "@media (max-width: 992px)": {
                      padding: "10px 16px",
                      fontSize: "14px",
                    },
                  },
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default Skills;
