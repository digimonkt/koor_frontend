import { Card, CardContent, Grid } from "@mui/material";
import styles from "./styles.module.css";
import Skeleton from "react-loading-skeleton";

function ResourceListSkeletonLoader() {
    return (
        <div>
            <Card
                sx={{
                    "&.MuiCard-root": {
                        boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                        borderRadius: "10px",
                    },
                    mb: 2.5,
                }}
            >
                <CardContent
                    sx={{
                        "&.MuiCardContent-root": {
                            padding: "30px",
                        },
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item lg={4} xs={12}>
                            <div className={`${styles.imgbox}`}>
                                <Skeleton
                                    height={250}
                                    width={250}
                                    style={{ borderRadius: "5px" }}
                                />
                            </div>
                        </Grid>
                        <Grid item lg={8} xs={12}>
                            <div className={`${styles.content}`}>
                                <h3><Skeleton
                                    height={50}
                                    width={500}
                                    style={{ borderRadius: "5px" }}
                                /></h3>
                                <Skeleton
                                    height={100}
                                    width={500}
                                    style={{ borderRadius: "5px", marginTop: "5px" }}
                                />
                                <Skeleton
                                    height={50}
                                    width={200}
                                    style={{ borderRadius: "50px", marginTop: "5px" }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card
                sx={{
                    "&.MuiCard-root": {
                        boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                        borderRadius: "10px",
                    },
                    mb: 2.5,
                }}
            >
                <CardContent
                    sx={{
                        "&.MuiCardContent-root": {
                            padding: "30px",
                        },
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item lg={4} xs={12}>
                            <div className={`${styles.imgbox}`}>
                                <Skeleton
                                    height={250}
                                    width={250}
                                    style={{ borderRadius: "5px" }}
                                />
                            </div>
                        </Grid>
                        <Grid item lg={8} xs={12}>
                            <div className={`${styles.content}`}>
                                <h3><Skeleton
                                    height={50}
                                    width={500}
                                    style={{ borderRadius: "5px" }}
                                /></h3>
                                <Skeleton
                                    height={100}
                                    width={500}
                                    style={{ borderRadius: "5px", marginTop: "5px" }}
                                />
                                <Skeleton
                                    height={50}
                                    width={200}
                                    style={{ borderRadius: "50px", marginTop: "5px" }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

export default ResourceListSkeletonLoader;
