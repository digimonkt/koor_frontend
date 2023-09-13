import { SVG } from "@assets/svg";
import ApplicationOptions from "@components/applicationOptions";
import { Avatar, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
// import PerfectScrollbar from "react-perfect-scrollbar";
import InfiniteScroll from "react-infinite-scroller";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendIcon from "@mui/icons-material/Send";
import { FilledButton } from "@components/button";
import { USER_ROLES } from "@utils/enum";
import { useSelector } from "react-redux";
import {
  getConversationIdByUserIdAPI,
  getConversationMessageHistoryAPI,
  sendAttachmentAPI,
} from "@api/chat";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utcPlugin from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";
import urlcat from "urlcat";
import { WebSocketClient } from "@utils/constants/websocket";
import { LabeledInput } from "@components/input";
import { transformMessageResponse } from "@api/transform/chat";
import styles from "./message.module.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { GetUserDetailsAPI } from "@api/user";
import { generateFileUrl } from "@utils/generateFileUrl";
import DialogBox from "@components/dialogBox";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(relativeTime);

function ChatBox() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { role, currentUser } = useSelector((state) => state.auth);
  const [messages, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isScrollToBottom, setIsScrollToBottom] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [ws, setWs] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const scrollbarRef = useRef();
  const [fullImg, setFullImg] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const getMessageHistory = async ({ data, isScrollToBottom, initialLoad }) => {
    const res = await getConversationMessageHistoryAPI({
      conversationId: searchParams.get("conversion"),
      limit: 20,
      ...(data || {}),
    });
    if (res.remote === "success") {
      if (initialLoad) {
        setMessage([...res.data.results]);
      } else {
        setMessage([...messages, ...res.data.results]);
      }
      setTimeout(() => {
        setHasMore(!!res.data.next);
      }, 500);
      if (isScrollToBottom) {
        setTimeout(() => {
          setIsScrollToBottom(true);
        }, 100);
      }
    }
    setIsLoading(false);
  };

  const scrollToBottom = () => {
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollTop = scrollbarRef.current.scrollHeight;
    }
    setIsScrollToBottom(false);
  };
  const sendMessage = async (e) => {
    if (e) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (newMessage.trim()) {
      ws.sendMessage({
        message: newMessage.trim(),
        content_type: "text",
      });
      setNewMessage("");
      // Scroll to the bottom after sending the message
      scrollToBottom();
    }
  };

  const onMessageReceive = async (message) => {
    console.log({ message });
    const transformedMessage = transformMessageResponse(message);
    setMessage((prevMessage) => [transformedMessage, ...prevMessage]);
    if (!searchParams.get("conversion")) {
      navigate(
        urlcat("/employer/chat", { conversion: message.conversation.id })
      );
    }

    if (
      scrollbarRef.current.scrollHeight - scrollbarRef.current.scrollTop <=
      500
    ) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };
  const checkExistingConversation = async (id) => {
    const res = await getConversationIdByUserIdAPI({
      userId: id,
    });
    if (res.remote === "success") {
      const conversationId = res.data.conversation_id;
      if (conversationId) {
        navigate(
          urlcat("/employer/chat", { conversion: conversationId, userId: id })
        );
      }
    }
    setIsLoading(false);
  };

  const handleAttachment = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFormData = new FormData();
      newFormData.append("attachment", file);
      const res = await sendAttachmentAPI(newFormData);
      if (res.remote === "success") {
        ws.sendMessage({
          message_attachment: res.data,
          content_type: "attachment",
        });
        setTimeout(() => {
          scrollToBottom();
        }, 500);
      }
    }
  };

  const getUserDetails = async () => {
    const res = await GetUserDetailsAPI({ userId: searchParams.get("userId") });
    if (res.remote === "success") {
      setUserDetails(res.data);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const renderAttachment = (attachment) => {
    switch (attachment.type) {
      case "image":
        return (
          <img
            alt="attachment"
            src={generateFileUrl(attachment.path)}
            width={"400px"}
            rel="nofollow"
            onClick={() => { setFullImg(generateFileUrl(attachment.path)); setOpen(true); }}
          />
        );
      case "video":
        return (
          <video width="320" height="240" controls>
            <source src={generateFileUrl(attachment.path)} type="video/mp4"></source>
          </video>
        );
      case "audio":
        return (
          <audio controls>
            <source src={generateFileUrl(attachment.path)} type="audio/mp3"></source>
          </audio>
        );
      default:
        return (<span className="me-2 d-inline-flex">
          <a
            href={generateFileUrl(attachment.path)}
            target="_blank"
            className="m-0"
            rel="noreferrer"
          > {attachment.title} <SVG.UploadIcon /></a>
        </span>);
    }
  };
  // const formatSendMessage = () => {
  //   if (newMessage.trim()) {
  //     if (selectedFormat === "bold") {
  //       // Apply bold formatting to newMessage
  //       setNewMessage(`<strong>${newMessage}</strong>`);
  //     } else if (selectedFormat === "italic") {
  //       // Apply italic formatting to newMessage
  //       setNewMessage(`<em>${newMessage}</em>`);
  //     } else if (selectedFormat === "underline") {
  //       // Apply underline formatting to newMessage
  //       setNewMessage(`<u>${newMessage}</u>`);
  //     }

  //     // Reset the selected format and close the menu
  //     setSelectedFormat(null);
  //     setAnchorEl(null);
  //   }
  // };
  const applyFormatting = (value) => {
    // Apply the selected formatting to the currently selected text
    const formattedMessage = applyFormattingToSelection(newMessage, selectedFormat);
    console.log("------");
    setNewMessage(formattedMessage);
    setAnchorEl(null); // Close the menu
  };

  const applyFormattingToAll = (text) => {
    if (text) {
      switch (selectedFormat) {
        case "bold":
          return `<strong>${text}</strong>`;
        case "italic":
          return `<em>${text}</em>`;
        case "underline":
          return `<u>${text}</u>`;
        default:
          return text;
      }
    }
  };
  // Helper function to apply formatting to selected text
  const applyFormattingToSelection = (text, format) => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      switch (format) {
        case "bold":
          return text.replace(selectedText, `<strong>${selectedText}</strong>`);
        case "italic":
          return text.replace(selectedText, `<em>${selectedText}</em>`);
        case "underline":
          return text.replace(selectedText, `<u>${selectedText}</u>`);
        default:
          return text;
      }
    }
    return text;
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // Function to count words
  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    return words.length;
  };

  useEffect(() => {
    if (!isScrollToBottom) {
      scrollToBottom();
    }
  }, [isScrollToBottom]);

  useEffect(() => {
    setMessage([]);
    if (!searchParams.get("conversion") && searchParams.get("userId")) {
      checkExistingConversation(searchParams.get("userId"));
    }
    if (searchParams.get("conversion")) {
      getMessageHistory({
        data: {},
        isScrollToBottom: true,
        initialLoad: true,
      });
    }
    if (searchParams.get("userId")) {
      getUserDetails();
    }
  }, [searchParams.get("conversion")]);

  useEffect(() => {
    const queryParams = {};
    if (searchParams.get("conversion")) {
      queryParams.conversation_id = searchParams.get("conversion");
    } else {
      queryParams.user_id = searchParams.get("userId");
    }
    const data = {
      url: "ws/chat",
      queryParams: {
        ...queryParams,
      },
    };
    const ws = new WebSocketClient(data);
    ws.connect();
    ws.onMessage(onMessageReceive);
    setWs(ws);
    // Clean up WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, [searchParams.get("conversion"), searchParams.get("userId")]);
  useEffect(() => {
    scrollToBottom();
  });
  useEffect(() => {
    if (newMessage !== "") {
      applyFormatting();
    }
  }, [selectedFormat]);
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="message-header">
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <div className="headerbox">
                <h3>{userDetails.name || userDetails.email}</h3>
                {/* <p>Job Title</p> */}
              </div>
              <div>
                <ApplicationOptions details={{ user: userDetails }} view />
              </div>
            </Stack>
          </div>
          <div
            className={`meassagebox pe-0 ${styles.scrollbarChatBox}`}
            style={{
              // display: "flex",
              // flexDirection: "column-reverse",
              overflow: "auto",
            }}
            ref={scrollbarRef}
            id="chat-box-scroll-box"
          >
            {/* <PerfectScrollbar
              className="pe-4"
              ref={scrollbarRef}
              id="chat-box-scroll-box"
              component="div"
            > */}
            <InfiniteScroll
              isReverse={true}
              pageStart={0}
              loadMore={() => {
                if (messages.length) {
                  getMessageHistory({
                    data: {
                      messageId: messages[messages.length - 1].id,
                    },
                  });
                }
              }}
              hasMore={hasMore}
              useWindow={false}
              loader={
                <div key="loading" className="loader">
                  Loading ...
                </div>
              }
              style={{
                width: "99%",
              }}
            >
              {messages
                .slice()
                .reverse()
                .map((message) => {
                  return (
                    <div
                      className={`${message.user.id === currentUser.id
                        ? "rightside"
                        : "leftside"
                        } mt-3`}
                      key={message.id}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent={
                          message.user.id === currentUser.id ? "end" : "start"
                        }
                      >
                        {message.user.id === currentUser.id ? (
                          ""
                        ) : (
                          <Avatar src={message.user.image} />
                        )}
                        <div
                          className={`w-70 ${message.user.id === currentUser.id
                            ? "text-right"
                            : "text-left"
                            }`}
                        >
                          <div
                            className={`message-text ${message.user.id === currentUser.id
                              ? ""
                              : "message-tex-2"
                              }`}
                            style={{
                              background:
                                message.user.id === currentUser.id
                                  ? ""
                                  : role === USER_ROLES.jobSeeker
                                    ? "#D5E3F7"
                                    : "#FEEFD3",
                            }}
                          >
                            {message.user.id === currentUser.id ? (
                              ""
                            ) : (
                              <h4>{message.user.name}</h4>
                            )}
                            <div
                              className={
                                message.attachment || countWords(message.message) > 10 ? "" : "text-inline"
                              }
                            >
                              <div>
                                {message.attachment
                                  ? renderAttachment(message.attachment)
                                  : ""}
                                <p>{message.message}</p>
                              </div>
                              <div className={`ms-2 ${styles.chatTime}`}>
                                {dayjs.utc(message.createdAt).local().fromNow()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Stack>
                    </div>
                  );
                })}
            </InfiniteScroll>
            {/* </PerfectScrollbar> */}
          </div>
          <div className="bottomnav">
            <Stack direction={"row"} spacing={2}>
              <div className="chatinput">
                <span className="attachment-icon">
                  <SVG.AttachIcon style={{ position: "relative" }} />
                  <input type="file" onChange={handleAttachment} value={""} style={{ position: "absolute", opacity: "0", right: "45.5rem", width: "35px" }} />
                </span>
                <LabeledInput
                  placeholder="Write a message…"
                  style={{ background: "transparent" }}
                  type="textarea"
                  value={newMessage}
                  onChange={(e) => {
                    if (selectedFormat) {
                      const formattedText = applyFormattingToAll(e.target.value, selectedFormat);
                      setNewMessage(formattedText);
                    } else {
                      setNewMessage(e.target.value);
                    }
                  }}
                  onKeyPress={(e) => {
                    if (newMessage && newMessage.trim()) {
                      if (e.key === "Enter" && !e.shiftKey) {
                        sendMessage(e);
                      }
                    }
                  }}
                />
              </div>
              <Stack direction="row" spacing={2}>
                <IconButton
                  sx={{ border: "1px solid #848484" }}
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  style={{ border: "1px solid", width: "40px", height: "40px", borderRadius: "100%" }}
                  onClick={handleMenuOpen} // Open the menu when the IconButton is clicked
                >
                  <MoreHorizIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => { setSelectedFormat("bold"); setAnchorEl(null); }}>
                    <FormatBoldIcon />
                  </MenuItem>
                  <MenuItem onClick={() => { setSelectedFormat("italic"); setAnchorEl(null); }}>
                    <FormatItalicIcon />
                  </MenuItem>
                  <MenuItem onClick={() => { setSelectedFormat("underline"); setAnchorEl(null); }}>
                    <FormatUnderlinedIcon />
                  </MenuItem>
                </Menu>
                <FilledButton
                  sx={{
                    borderRadius: "35px",
                  }}
                  variant="contained"
                  title={<SendIcon />}
                  onClick={sendMessage}
                />
              </Stack>
            </Stack>
          </div>
          <DialogBox open={open} handleClose={handleClose}>
            <img src={fullImg} />
          </DialogBox>
        </>
      )}
    </>
  );
}

export default ChatBox;
