import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { TablePagination } from "./style";
// import { resourcesList } from "./fakeData";
import { ResourceCard } from "./component/resourceCard";
import { getResourcesAPI } from "@api/user";

const Resources = () => {
  const [resourceInfo, setResourceInfo] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const resourceList = async () => {
    const page = pages;
    const limit = 10;
    const response = await getResourcesAPI(limit, page);
    if (response.remote === "success") {
      setResourceInfo(response.data.results);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    }
  };
  function handlePageChange(_, page) {
    setPages(page);
  }

  useEffect(() => {
    resourceList();
  }, [pages]);
  return (
    <>
      <Box className={`${styles.resources}`}>
        <Container
          maxWidth={false}
          sx={{
            "@media(min-width:600px)": {
              paddingLeft: "100px",
              paddingRight: "100px",
            },
          }}
        >
          <Box component="h2" className={`${styles.heddingTitle}`}>
            Resources
          </Box>
          {resourceInfo.map((item, index) => (
            <ResourceCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.attachment.path}
              id={item.id}
            />
          ))}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TablePagination
              count={totalCount || 0}
              shape="rounded"
              page={pages}
              onChange={handlePageChange}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Resources;
