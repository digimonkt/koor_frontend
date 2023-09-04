import { Box, Container } from "@mui/material";
import React from "react";
import Articles from "./Articles";
import styles from "./resource.module.css";

const Content = (resourceList) => {
  const resourceContent = resourceList.resourceList.description;
  const resourcesId = resourceList.resourceList.id;
  return (
    <>
      <div className={styles.content_first_div}>
        <Container
          maxWidth={false}
          sx={{
            "@media(min-width:992px)": {
              paddingLeft: "100px",
              paddingRight: "100px",
            },
          }}
        >
          <div className={styles.content_div}>
            {resourceContent?.map((item, index) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{
                  __html: item,
                }}
              />
            ))}
          </div>
        </Container>
        <Box>
          <Articles resourcesId={resourcesId} />
        </Box>
      </div>
    </>
  );
};

export default Content;
