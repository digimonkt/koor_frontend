import { Box, Container, Grid } from "@mui/material";
import styles from "./resource.module.css";
import Skeleton from "react-loading-skeleton";
function ResourceSkeletonLoader() {
    return (
        <div>
            <Box className={styles.resource}>
                <Box className={styles.resource_back_box}>
                    <Container
                        maxWidth={false}
                        sx={{
                            "@media(min-width:992px)": {
                                paddingLeft: "100px",
                                paddingRight: "100px",
                            },
                        }}
                    >
                        <Grid
                            container
                            spacing={3}
                            direction={{ sm: "row-reverse", md: "row", lg: "row-reverse" }}
                        >
                            <Grid item lg={7} sm={6} xs={12}>
                                <Box className={styles.resource_text_box}>
                                    <Box>
                                        <Skeleton
                                            height={50}
                                            width={100}
                                            style={{ borderRadius: "5px" }}
                                        />
                                        <Skeleton
                                            height={200}
                                            width={400}
                                            style={{ borderRadius: "5px" }}
                                        />
                                        <Box className={styles.resource_social_box}>
                                            <p className={styles.resource_share_p}>Share:</p>
                                            <div className={styles.resource_social_div}>
                                                <Skeleton
                                                    height={50}
                                                    width={100}
                                                    style={{ borderRadius: "5px" }}
                                                />
                                            </div>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item lg={5} sm={6} xs={12}>
                                <Box>
                                    <Skeleton
                                        height={250}
                                        width={250}
                                        style={{ borderRadius: "5px" }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                    <Box>
                        <Skeleton
                            height={50}
                            width={500}
                            style={{ borderRadius: "5px" }}
                        />
                        <Skeleton
                            height={50}
                            width={500}
                            style={{ borderRadius: "5px" }}
                        />
                        <Skeleton
                            height={50}
                            width={500}
                            style={{ borderRadius: "5px" }}
                        />
                        <Skeleton
                            height={50}
                            width={500}
                            style={{ borderRadius: "5px" }}
                        />
                        <Skeleton
                            height={50}
                            width={500}
                            style={{ borderRadius: "5px" }}
                        />
                    </Box>
                </Box>
            </Box>
        </div>
    );
};
export default ResourceSkeletonLoader;
