import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React from "react";
import { SVG } from "@assets/svg";
import JobCard from "@components/jobCard";

function AppliedJobsComponent() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
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
            padding: "30px",
          },
        }}
      >
        <div className="saved-jobs">
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <h2 className="m-0">
              Applied jobs
              <Chip
                label="5"
                className="ms-3"
                sx={{
                  background: "#FEEFD3",
                  color: "#EEA23D",
                  fontFamily: "Bahnschrift",
                  fontSize: "16px",
                }}
              />
            </h2>
            <IconButton
              sx={{ width: "50px", height: "50px" }}
              onClick={handleClick}
            >
              <SVG.FilterIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <h5 className="px-3 mt-0 mb-1">Sort by:</h5>
              <MenuItem onClick={handleClose} className="fillterbox">
                Salary
              </MenuItem>
              <MenuItem onClick={handleClose} className="fillterbox">
                Expiration
              </MenuItem>
              <MenuItem onClick={handleClose} className="fillterbox">
                Workload
                {/* <span className="ms-3">{arrow_upward}</span> */}
              </MenuItem>
            </Menu>
          </Stack>
        </div>
        <div className="savedjobs">
          <JobCard logo applied />
        </div>
      </CardContent>
    </Card>
  );
}

export default AppliedJobsComponent;
