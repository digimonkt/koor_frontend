import { Box, Container } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
import { TablePagination } from "./style";
import { resourcesList } from "./fakeData";
import { ResourceCard } from "./component/resourceCard";

const Resources = () => {
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
          {resourcesList.map((item, index) => (
            <ResourceCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.img}
            />
          ))}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TablePagination count={10} shape="rounded" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Resources;
