import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { TablePagination } from "./style";
import { ResourceCard } from "./component/resourceCard";
import { getResourcesAPI } from "../../api/common";
import ResourceListSkeletonLoader from "./resourceListSkelton";
import { NoDataFoundAnimation } from "@components/animations";

const Resources = () => {
  const [resourceList, setResourceList] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const getResourceDetails = async () => {
    const page = pages;
    const limit = 10;
    setLoading(true);
    const response = await getResourcesAPI(limit, page);
    if (response.remote === "success") {
      setLoading(false);
      setResourceList(response.data.results);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      setLoading(false);
    }
  };
  function handlePageChange(_, page) {
    setPages(page);
  }

  useEffect(() => {
    getResourceDetails();
  }, [pages]);

  return (
    <>
      <Box className={`${styles.resources}`}>
        <Container
          maxWidth={false}
          sx={{
            "@media(min-width:992px)": {
              paddingLeft: "100px",
              paddingRight: "100px",
            },
          }}
        >
          <Box component="h1" className={`${styles.heddingTitle}`}>
            Resources
          </Box>
          {resourceList.length > 0 && loading ? (
            resourceList.map((item, index) => (
              <ResourceCard
                key={index}
                title={item.title}
                description={item.description}
                image={item.attachment.path}
                id={item.id}
              />
            ))
          ) : loading ? (
            <ResourceListSkeletonLoader />
          ) : (
            <NoDataFoundAnimation title="We apologize, but we couldn't find any resources" />
          )}
          {pages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <TablePagination
                count={totalCount || 0}
                shape="rounded"
                page={pages}
                onChange={handlePageChange}
              />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Resources;
