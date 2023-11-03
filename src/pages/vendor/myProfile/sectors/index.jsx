import { Card, CardContent, Chip, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SVG } from "../../../../assets/svg";
import { getTenderSector } from "../../../../redux/slice/choices";
import { OutlinedButton } from "../../../../components/button";
import { useDebounce } from "usehooks-ts";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import NoItem from "../noItem";
import { addSectorsDetailsAPI } from "../../../../api/vendor";
import { setErrorToast, setSuccessToast } from "../../../../redux/slice/toast";
import Loader from "../../../../components/loader";

const Sectors = () => {
  const dispatch = useDispatch();
  const { sectors } = useSelector((state) => state.choices);
  const {
    currentUser: { sectors: selectedSectors },
  } = useSelector((state) => state.auth);
  const [searchSector, setSearchSector] = useState("");
  const debouncedSearchSectorValue = useDebounce(searchSector, 500);
  const [newSelectedSectors, setNewSelectedSectors] = useState([]);
  const [removedSectors, setRemovedSectors] = useState([]);
  const [allSectors, setAllSectors] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleClick = (sector) => {
    setSearchSector("");
    setNewSelectedSectors((prevState) => [...prevState, sector]);
    setAllSectors((prevState) => [...prevState, sector]);
  };
  const handleDelete = (id) => {
    setRemovedSectors((prevState) => [...prevState, id]);
    setAllSectors((prevState) => prevState.filter((state) => state.id !== id));
    setNewSelectedSectors((prevState) =>
      prevState.filter((state) => state.id !== id)
    );
  };
  const checkIfEmpty = (tagAdd, tagRemove) => {
    // Check if both sector_add and sector_remove are empty arrays
    return tagAdd.length !== 0 || tagRemove.length !== 0;
  };
  const updateSectors = async () => {
    setLoading(true);
    const payload = {
      sector_add: newSelectedSectors.map((sector) => sector.id),
      sector_remove: removedSectors,
    };
    const shouldDispatch = checkIfEmpty(
      payload.sector_add,
      payload.sector_remove
    );
    if (shouldDispatch) {
      const res = await addSectorsDetailsAPI(payload);
      if (res.remote === "success") {
        setNewSelectedSectors([]);
        setRemovedSectors([]);
        dispatch(setSuccessToast("Sectors updated successfully"));
      } else {
        dispatch(setErrorToast("Something went wrong"));
      }
      setLoading(false);
    } else {
      dispatch(setErrorToast("Please select at least one sector"));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSectors) {
      setAllSectors((prevState) => [
        ...selectedSectors.map((sector) => ({
          id: sector.id,
          title: sector.sector.title,
        })),
      ]);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchSectorValue) {
      dispatch(
        getTenderSector({
          search: debouncedSearchSectorValue,
        })
      );
    }
  }, [debouncedSearchSectorValue]);

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
            <h2>Sectors</h2>
            <p>Maximum 15 Sectors</p>
            <Stack direction="row" spacing={0} flexWrap="wrap">
              {allSectors.length ? (
                allSectors.map((item, index) => (
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
                      padding: "5px 10px 5px 6px",
                      margin: "0px 8px 8px 0px",
                    }}
                  />
                ))
              ) : (
                <NoItem
                  icon={<SVG.SkillsIcon />}
                  description={
                    <p>
                      List your sectors that you think will be useful for a
                      tender you’re looking for. Highlight your strengths and
                      remember to be honest.
                    </p>
                  }
                />
              )}
            </Stack>

            {allSectors.length <= 15 && (
              <div className="skills-input mt-3">
                <input
                  type="text"
                  placeholder="Start typing a sector to add a new one"
                  onChange={(e) => setSearchSector(e.target.value)}
                  value={searchSector}
                />
                {debouncedSearchSectorValue && searchSector && (
                  <div className={styles.search_results_box}>
                    {sectors.data
                      .filter(
                        (sector) =>
                          !allSectors.some(
                            (otherItem) => otherItem.title === sector.title
                          )
                      )
                      .map((sector) => {
                        return (
                          <div
                            key={sector.id}
                            className={styles.search_results}
                            onClick={() => handleClick(sector)}
                          >
                            {sector.title}
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
                        Update Sectors
                      </>
                    )}
                  </>
                }
                onClick={updateSectors}
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
export default Sectors;
