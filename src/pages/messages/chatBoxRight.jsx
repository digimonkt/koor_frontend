import { IMAGES } from "@assets/images";
import { SVG } from "@assets/svg";
import ApplicationOptions from "@components/applicationOptions";
import { Avatar, IconButton, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendIcon from "@mui/icons-material/Send";
import { FilledButton } from "@components/button";
import { USER_ROLES } from "@utils/enum";
import { useSelector } from "react-redux";

function ChatBox() {
  const { role } = useSelector((state) => state.auth);
  const [messages] = useState([]);
  const scrollbarRef = useRef();

  useEffect(() => {
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollTop = scrollbarRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="message-header">
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <div className="headerbox">
            <h3>John Doe</h3>
            <p>Job Title</p>
          </div>
          <ApplicationOptions />
        </Stack>
      </div>
      <div className="meassagebox pe-0">
        <PerfectScrollbar className="pe-4" ref={scrollbarRef}>
          <div className="rightside mt-3">
            <Stack direction="row" spacing={2} justifyContent="end">
              <div className="w-70 text-right">
                <div className="message-text">
                  <div className="text-inline">
                    <p>
                      Today I've asked my business partners about this. Let's
                      ditch this and see how it looks like. Okay?
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
                <div
                  className="message-text message-tex-2 "
                  style={{
                    background:
                      role === USER_ROLES.jobSeeker ? "#D5E3F7" : "#FEEFD3",
                  }}
                >
                  <h4>Junges Müller</h4>
                  <div className="text-inline">
                    <p>Of course. I'll show you what I made in a while.</p>
                    <span className="ms-2">16:03</span>
                  </div>
                </div>
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
            >
              <MoreHorizIcon />
            </IconButton>

            <FilledButton
              sx={{
                borderRadius: "35px",
              }}
              variant="contained"
            >
              <SendIcon />
            </FilledButton>
          </Stack>
        </Stack>
      </div>
    </>
  );
}

export default ChatBox;
