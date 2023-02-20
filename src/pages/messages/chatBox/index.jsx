import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Menu,
  Stack,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { chatsidebar } from "./helper";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { styled } from "@mui/system";
import { useState } from "react";
import { SVG } from "@assets/svg";
import { IMAGES } from "@assets/images";
import DialogBox from "@components/dialogBox";
import { useSelector } from "react-redux";

const StackStyled = styled("div")(() => ({
  padding: "5px 10px",
  fontFamily: "Playfair Displa",
  fontSize: "16px",
  color: "#121212",
  ".format-bold": {
    fontWeight: "800",
    cursor: "pointer",
  },
  ".format-itlic": {
    fontWeight: "400",
    fontStyle: "italic",
    cursor: "pointer",
  },
  ".format-underline": {
    fontWeight: "400",
    textDecoration: "underline",
    cursor: "pointer",
  },
  "& .format-box span:hover": {
    opacity: "0.7",
  },
}));

const ChatBox = () => {
  const [openDateModal, setOpenDateModal] = useState(false);
  const [value, setValue] = useState(dayjs("2022-04-07"));
  // const handleClickOpen = () => {
  //   setOpenDateModal(true);
  // };

  const handleCloseDate = () => {
    setOpenDateModal(false);
  };
  const { role } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            height: "100%",
          },
        }}
      >
        <Box sx={{ display: "flex", height: "100%", py: 2 }}>
          <Box
            sx={{
              width: { sm: "350px" },
            }}
            className="leftchatbox"
          >
            <div className="searchmessage">
              <div className="searchmessage-icon">
                {/* <span>{<SVG.HeaderSearch />}</span> */}
                <input className="chat-search" placeholder="Search" />
              </div>
            </div>
            <div
              className={`chatbox ${
                role === "jobSeeker" ? "jobseekerbox" : null
              }`}
            >
              <PerfectScrollbar
                onScrollY={(container) =>
                  console.log(`scrolled to: ${container.scrollTop}.`)
                }
              >
                <ul>
                  {chatsidebar.map((items, index) => (
                    <li key={index} className={items.active}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                          sx={{
                            width: "70px",
                            height: "70px",
                            background: "#F0F0F0",
                            color: "#CACACA",
                          }}
                          alt="Remy Sharp"
                          src={items.user}
                        />
                        <div className="chatuser-text">
                          <h3>
                            {items.title} <small>{items.starIcon}</small>
                            <span
                              className={`count ${
                                role === "jobSeeker" ? "jobcount" : ""
                              }`}
                            >
                              2
                            </span>
                          </h3>
                          <h6>{items.subtitle}</h6>
                          <p>{items.pragraph}</p>
                        </div>
                      </Stack>
                      <Divider className="mt-3" />
                    </li>
                  ))}
                </ul>
              </PerfectScrollbar>
            </div>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              padding: "16px",
              width: { sm: "calc(100% - 350px)" },
            }}
          >
            <div className="message-header">
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <div className="headerbox">
                  <h3>Junges Müller</h3>
                  <p>Online Research Participant</p>
                </div>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="text"
                    className="buttonbox"
                    sx={{
                      color:
                        role === "jobSeeker"
                          ? "#EEA23D !important"
                          : "#274593 !important",
                    }}
                  >
                    <div>
                      {<SVG.StarIcon />}
                      <p>Shortlisted</p>
                    </div>
                  </Button>
                  <Button
                    // onClick={handleClickOpen}
                    variant="text"
                    className="buttonbox"
                    sx={{
                      color:
                        role === "jobSeeker"
                          ? "#EEA23D !important"
                          : "#274593 !important",
                    }}
                  >
                    <div>
                      {<SVG.CalenderChat />}
                      <p>Plan interview</p>
                    </div>
                  </Button>

                  {/* <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<ExampleCustomInput />}
                    withPortal
                    timeInputLabel="Time"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeSelect
                  /> */}
                  {/* <Button
                    variant="text"
                    className="buttonbox"
                    sx={{
                      color:
                        role === "jobSeeker"
                          ? "#EEA23D !important"
                          : "#274593 !important",
                    }}
                  >
                    <div className="videocall">
                      {videoIcon}
                      <p>Call ["Junges Müller"]</p>
                    </div>
                  </Button> */}
                </Stack>
              </Stack>
            </div>
            <div className="meassagebox pe-0">
              <PerfectScrollbar className="pe-4">
                <div className="rightside mt-3">
                  <Stack direction="row" spacing={2} justifyContent="end">
                    <div className="w-70 text-right">
                      <div className="message-text ">
                        <div className="text-inline">
                          <p>
                            Today I’ve asked my business partners about this.
                            Let’s ditch this and see how it looks like. Okay?
                          </p>
                          <span className="ms-2">16:03</span>
                        </div>
                      </div>
                    </div>
                  </Stack>
                </div>
                <div className="leftside mt-3">
                  <Stack direction="row" spacing={2} justifyContent="start">
                    <Avatar src={IMAGES.User} />
                    <div className="w-70 text-left">
                      <div className="message-text message-tex-2">
                        <h4>Junges Müller</h4>
                        <div className="text-inline">
                          <p>
                            Of course. I’ll show you what I made in a while.
                          </p>
                          <span className="ms-2">16:03</span>
                        </div>
                      </div>
                    </div>
                  </Stack>
                </div>
                <div className="rightside mt-3">
                  <Stack direction="row" spacing={2} justifyContent="end">
                    <div className="w-70 text-right">
                      <div className="message-text ">
                        <div className="text-inline">
                          <p>Super</p>
                          <span className="ms-2">16:03</span>
                        </div>
                      </div>
                    </div>
                  </Stack>
                </div>
                <div className="rightside mt-3">
                  <Stack direction="row" spacing={2} justifyContent="end">
                    <div className="w-70 text-right">
                      <div className="message-text ">
                        <div className="text-inline">
                          <p>By the way, have you seen an example?</p>
                          <span className="ms-2">16:05</span>
                        </div>
                      </div>
                    </div>
                  </Stack>
                </div>
                <div className="leftside mt-3">
                  <Stack direction="row" spacing={2} alignItems="end">
                    <Avatar src={IMAGES.User} />
                    <div className="w-70 text-left">
                      <div className="message-text message-tex-2">
                        <h4>Junges Müller</h4>
                        <div className="text-inline">
                          <p>
                            Not yet, attention. We can fit two rows here to be
                            able to showcase yourself before a potential
                            employer even opens your resume. Like my some more
                            text.
                          </p>
                          <span className="ms-2">16:03</span>
                        </div>
                      </div>
                    </div>
                  </Stack>
                </div>
                <div className="rightside mt-3">
                  <Stack direction="row" spacing={2} justifyContent="end">
                    <div className="w-70 text-right">
                      <div className="message-text ">
                        <img src={IMAGES.UserMessage} alt="message" />
                      </div>
                      <div className="unread">Unread</div>
                    </div>
                  </Stack>
                </div>
              </PerfectScrollbar>
            </div>
            <div className="bottomnav">
              <Stack direction={"row"} spacing={2}>
                <div className="chatinput">
                  <span className="attachment-icon">{<SVG.AttachIcon />}</span>
                  <textarea
                    placeholder="Write a message…"
                    value="Write a message…"
                  ></textarea>
                </div>
                <Stack direction="row" spacing={2}>
                  <IconButton
                    sx={{ border: "1px solid #848484" }}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    className="menufloting"
                  >
                    <StackStyled>
                      <Stack
                        direction="row"
                        spacing={1.875}
                        className="format-box"
                      >
                        <span className="format-bold">B</span>
                        <span className="format-itlic">I</span>
                        <span className="format-underline">U</span>
                      </Stack>
                    </StackStyled>
                  </Menu>
                  <Button
                    sx={{
                      background: role === "jobSeeker" ? "#EEA23D" : "#274593",
                      borderRadius: "35px",
                    }}
                    variant="contained"
                  >
                    <SendIcon />
                  </Button>
                </Stack>
              </Stack>
            </div>
          </Box>
        </Box>
      </Card>
      <DialogBox
        open={openDateModal}
        handleClose={handleCloseDate}
        modalclass="datepikerModal"
        content={
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDateTimePicker
                displayStaticWrapperAs="desktop"
                disableFuture={false}
                openTo="day"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <div className="text-end mb-3 px-3">
              <Button
                onClick={handleCloseDate}
                variant="outlined"
                sx={{
                  "&.MuiButton-outlined": {
                    borderRadius: "73px",
                    border: "1px solid #274593",
                    color: "#274593",
                    fontWeight: "500",
                    fontSize: "16px",
                    fontFamily: "Bahnschrift",
                    padding: "5px 20px",
                    marginRight: "10px",

                    "&:hover": { background: "rgba(40, 71, 146, 0.1)" },
                    "@media (max-width: 992px)": {
                      fontSize: "14px",
                    },
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCloseDate}
                variant="outlined"
                sx={{
                  "&.MuiButton-outlined": {
                    borderRadius: "73px",
                    border: "1px solid #274593",
                    color: "#fff",
                    fontWeight: "500",
                    fontSize: "16px",
                    fontFamily: "Bahnschrift",
                    padding: "5px 30px",
                    background: "#274593",

                    "&:hover": { background: "#1E3162" },
                    "@media (max-width: 992px)": {
                      padding: "10px 16px",
                      fontSize: "14px",
                    },
                  },
                }}
              >
                Ok
              </Button>
            </div>
          </>
        }
      />
    </>
  );
};

export default ChatBox;
