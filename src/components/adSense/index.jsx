import { Grid } from "@mui/material";
import React from "react";
function AdSenseCard({ code, show }) {
    return (<>
        {show && code !== "" && <div className="job_card">
            <Grid container spacing={1.875}>
                <div dangerouslySetInnerHTML={{ __html: code }} />{ }
            </Grid>
        </div>
        }
    </>
    );
}

export default AdSenseCard;
