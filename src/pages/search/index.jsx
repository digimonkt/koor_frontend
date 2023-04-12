import React from "react";
import styles from "./style.module.css";
import SearchInput from "@components/searchInput";
import { SVG } from "@assets/svg";
import { Chip, Container, IconButton, Stack } from "@mui/material";
import AdvanceFilter from "@pages/jobs/jobSearch/AdvanceFilter";
import TalentCard from "@components/talentCard";
function Search() {
  return (
    <div className={`${styles.body}`}>
      <SearchInput
        svg={<SVG.Buttonsearch />}
        placeholder="Search jobs"
        // handleSearch={handleSearch}
        // value={search}
      />
      <Container>
        <AdvanceFilter
        //   getSearchJobs={getSearchJobs}
        //   totalJobs={totalJobs}
        //   searchKeyword={search}
        />
      </Container>
      <div className="paginations">
        <Container>pagination</Container>
      </div>
      <Container>
        <div className={`${styles.jobcards}`}>
          <div className="saved-jobs">
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <h2 className="m-0">
                Title
                <Chip
                  label={5}
                  className="ms-3"
                  sx={{
                    background: "#FEEFD3",
                    color: "#EEA23D",
                    fontFamily: "Bahnschrift",
                    fontSize: "16px",
                  }}
                />
              </h2>
              <IconButton sx={{ width: "50px", height: "50px" }}>
                {<SVG.FillterICon />}
              </IconButton>
            </Stack>
          </div>
          <TalentCard />
        </div>
      </Container>
      <div className="paginations pt-4">
        <Container>pagination</Container>
      </div>
    </div>
  );
}

export default Search;
