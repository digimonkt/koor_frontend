import { Card, CardContent, Chip, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SVG } from "../../../../assets/svg";
import { getTenderTags } from "../../../../redux/slice/choices";
import { OutlinedButton } from "../../../../components/button";
import { useDebounce } from "usehooks-ts";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import NoItem from "../noItem";
import { addTagsDetailsAPI } from "../../../../api/vendor";
import { setErrorToast, setSuccessToast } from "../../../../redux/slice/toast";
import Loader from "../../../../components/loader";
import { Capacitor } from "@capacitor/core";

const Tags = (props) => {
  const dispatch = useDispatch();
  const platform = Capacitor.getPlatform();
  const { tags } = useSelector((state) => state.choices);
  const {
    currentUser: { tags: selectedTags },
  } = useSelector((state) => state.auth);
  const [searchTag, setSearchTag] = useState("");
  const debouncedSearchTagValue = useDebounce(searchTag, 500);
  const [newSelectedTags, setNewSelectedTags] = useState([]);
  const [removedTags, setRemovedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleClick = (tag) => {
    setSearchTag("");
    setNewSelectedTags((prevState) => [...prevState, tag]);
    setAllTags((prevState) => [...prevState, tag]);
  };
  const handleDelete = (id) => {
    setRemovedTags((prevState) => [...prevState, id]);
    setAllTags((prevState) => prevState.filter((state) => state.id !== id));
    setNewSelectedTags((prevState) =>
      prevState.filter((state) => state.id !== id)
    );
  };
  const checkIfEmpty = (tagAdd, tagRemove) => {
    // Check if both tag_add and tag_remove are empty arrays
    return tagAdd.length !== 0 || tagRemove.length !== 0;
  };

  const updateTags = async () => {
    setLoading(true);
    const payload = {
      tag_add: newSelectedTags.map((tag) => tag.id),
      tag_remove: removedTags,
    };
    const shouldDispatch = checkIfEmpty(payload.tag_add, payload.tag_remove);
    if (shouldDispatch) {
      const res = await addTagsDetailsAPI(payload);
      if (res.remote === "success") {
        setNewSelectedTags([]);
        setRemovedTags([]);
        dispatch(setSuccessToast("Tags updated successfully"));
      } else {
        dispatch(setErrorToast("Something went wrong"));
      }
      setLoading(false);
    } else {
      dispatch(setErrorToast("Please select at least one tag"));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTags) {
      setAllTags((prevState) => [
        ...selectedTags.map((tag) => ({
          id: tag.id,
          title: tag.tag.title,
        })),
      ]);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchTagValue) {
      dispatch(
        getTenderTags({
          search: debouncedSearchTagValue,
        })
      );
    }
  }, [debouncedSearchTagValue]);

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
            <Stack
              spacing={2}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ mb: 1 }}
            >
              <h2 className="mb-0">Tags</h2>
              {platform === "android" || platform === "ios" ? (
                <IconButton size="small" onClick={() => props.fun()}>
                  <SVG.ArrowUpIcon />
                </IconButton>
              ) : null}
            </Stack>
            {platform === "android" || platform === "ios" ? (
              <>
                {props.toggle ? (
                  <div>
                    <p>Maximum 15 Tags</p>
                    <Stack direction="row" spacing={0} flexWrap="wrap">
                      {allTags.length ? (
                        allTags.map((item, index) => (
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
                              padding: "5px 10px 5px 5px",
                              margin: "0px 8px 8px 0px",
                            }}
                          />
                        ))
                      ) : (
                        <NoItem
                          icon={<SVG.SkillsIcon />}
                          description={
                            <p style={{ textAlign: "justify" }}>
                              List your tags that you think will be useful for a
                              tender you’re looking for. Highlight your
                              strengths and remember to be honest.
                            </p>
                          }
                        />
                      )}
                    </Stack>

                    {allTags.length <= 15 && (
                      <div className="skills-input mt-3">
                        <input
                          type="text"
                          placeholder="Start typing a tag to add a new one"
                          onChange={(e) => setSearchTag(e.target.value)}
                          value={searchTag}
                        />
                        {debouncedSearchTagValue && searchTag && (
                          <div className={styles.search_results_box}>
                            {tags.data
                              .filter(
                                (tag) =>
                                  !allTags.some(
                                    (otherItem) => otherItem.title === tag.title
                                  )
                              )
                              .map((tag) => {
                                return (
                                  <div
                                    key={tag.id}
                                    className={styles.search_results}
                                    onClick={() => handleClick(tag)}
                                  >
                                    {tag.title}
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
                              <Loader
                                loading={loading}
                                style={{ color: "#EEA23D" }}
                              />
                            ) : (
                              <>
                                <span className="me-2 d-inline-flex">
                                  <SVG.SaveFile />
                                </span>
                                Update Tag
                              </>
                            )}
                          </>
                        }
                        onClick={updateTags}
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
                ) : (
                  ""
                )}
              </>
            ) : (
              <div>
                <p>Maximum 15 Tags</p>
                <Stack direction="row" spacing={0} flexWrap="wrap">
                  {allTags.length ? (
                    allTags.map((item, index) => (
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
                          padding: "5px 10px 5px 5px",
                          margin: "0px 8px 8px 0px",
                        }}
                      />
                    ))
                  ) : (
                    <NoItem
                      icon={<SVG.SkillsIcon />}
                      description={
                        <p style={{ textAlign: "justify" }}>
                          List your tags that you think will be useful for a
                          tender you’re looking for. Highlight your strengths
                          and remember to be honest.
                        </p>
                      }
                    />
                  )}
                </Stack>

                {allTags.length <= 15 && (
                  <div className="skills-input mt-3">
                    <input
                      type="text"
                      placeholder="Start typing a tag to add a new one"
                      onChange={(e) => setSearchTag(e.target.value)}
                      value={searchTag}
                    />
                    {debouncedSearchTagValue && searchTag && (
                      <div className={styles.search_results_box}>
                        {tags.data
                          .filter(
                            (tag) =>
                              !allTags.some(
                                (otherItem) => otherItem.title === tag.title
                              )
                          )
                          .map((tag) => {
                            return (
                              <div
                                key={tag.id}
                                className={styles.search_results}
                                onClick={() => handleClick(tag)}
                              >
                                {tag.title}
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
                          <Loader
                            loading={loading}
                            style={{ color: "#EEA23D" }}
                          />
                        ) : (
                          <>
                            <span className="me-2 d-inline-flex">
                              <SVG.SaveFile />
                            </span>
                            Update Tag
                          </>
                        )}
                      </>
                    }
                    onClick={updateTags}
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
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default Tags;
