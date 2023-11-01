import { SVG } from "../../assets/svg";
import ApplicationOptions from "../../components/applicationOptions";
import { Avatar, Box, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import PerfectScrollbar from "react-perfect-scrollbar";
import InfiniteScroll from "react-infinite-scroller";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendIcon from "@mui/icons-material/Send";
import { FilledButton, OutlinedButton } from "../../components/button";
import { USER_ROLES } from "../../utils/enum";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMessageAttachmentAPI,
  getConversationIdByUserIdAPI,
  getConversationMessageHistoryAPI,
  getJobSeekerJobApplicationAPI,
  getVendorTenderApplicationAPI,
  sendAttachmentAPI,
  updateMessageAttachmentAPI,
} from "../../api/chat";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utcPlugin from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";
import urlcat from "urlcat";
import { WebSocketClient } from "../../utils/constants/websocket";
// import { LabeledInput } from "../../components/input";
import { transformMessageResponse } from "../../api/transform/chat";
import styles from "./message.module.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { GetUserDetailsAPI } from "../../api/user";
import { generateFileUrl } from "../../utils/generateFileUrl";
import DialogBox from "../../components/dialogBox";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import MediaControl from "./meidaControl";
import { ImageDataDelete } from "./helper";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import ReactQuill from "react-quill";
import Loader from "@components/loader";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { setJobSeekerJobApplication, setTotalApplicationsByJob, setTotalApplicationsByTender, setVendorTenderApplication } from "@redux/slice/employer";
import LabeledRadioInputComponent from "@components/input/labeledRadioInput";
import { getApplicationOnJobAPI, getApplicationOnTenderAPI } from "@api/employer";
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(relativeTime);

function ChatBox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { role, currentUser, isBlackListedByEmployer } = useSelector(
    (state) => state.auth
  );
  const { jobSeekerJobApplication, vendorTenderApplication } = useSelector((state) => state.employer);
  const [messages, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [hashId, setHashId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isScrollToBottom, setIsScrollToBottom] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [ws, setWs] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [applicationList, setApplicationList] = useState({});
  const scrollbarRef = useRef();
  const [fullImg, setFullImg] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEditMessage, setOpenEditMessage] = useState(false);
  const [openReplyMessage, setOpenReplyMessage] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [messageIsMedia, setMessageIsMedia] = useState("text");
  const [anchorElMedia, setAnchorElMedia] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [messageForUpdate, setMessageForUpdate] = useState("");
  const [messageReplayId, setMessageReplayId] = useState(null);
  const [openSelectApplicationModal, setOpenSelectApplicationModal] = useState(false);
  const [totalShortlisted, setTotalShortlisted] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);
  const [applicationId, setApplicationId] = useState(0);
  const [totalPlannedInterview, setTotalPlannedInterview] = useState(0);
  const handleClickMedia = (event, type) => {
    setMessageIsMedia(type);
    setAnchorElMedia(event.currentTarget);
  };
  const handleMenuCloseMedia = (action) => {
    setAnchorElMedia(null);
    if (action === "delete") {
      deleteMessageAttachment(selectedMessage.id);
    } else if (action === "copy") {
      handleCopyText(selectedMessage.message);
    } else if (action === "edit") {
      setOpenEditMessage(true);
    } else if (action === "quote") {
      console.log("");
      setOpenReplyMessage(true);
    }
  };
  const handleCopyText = (message) => {
    // HTML content to copy
    const htmlContent = message;

    // Create a temporary div element
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    // Get the text content of the div (without HTML tags)
    const textToCopy = tempDiv.textContent;

    // Copy the text to the clipboard
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        dispatch(setSuccessToast("Message Copied successfully"));
      })
      .catch((error) => {
        console.error("Failed to copy HTML content: ", error);
      });
  };

  const deleteMessageAttachment = async (messageId) => {
    const res = await deleteMessageAttachmentAPI(messageId);
    if (res.remote === "success") {
      dispatch(setSuccessToast("Message deleted successfully"));
      // Filter out the deleted message from the message list
      const updatedMessages = messages.filter((msg) => msg.id !== messageId);
      setMessage(updatedMessages);
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  };
  const modules = {
    toolbar: [
      // [{ header: "1" }, { header: "2" }, { font: [] }],
      ["bold", "italic", "underline"], // Restrict the formats to bold, italic, and underline
      // ["link"],
      // ["clean"],
    ],
  };
  const formats = ["header", "font", "bold", "italic", "underline", "link"];
  const updateMessage = async () => {
    setLoading(true);
    const res = await updateMessageAttachmentAPI(selectedMessage.id, messageForUpdate);
    if (res.remote === "success") {
      setMessage(updateMessageInArray());
      setOpenEditMessage(false);
      setLoading(false);
      setMessageForUpdate("");
      updateMessageInArray();
      dispatch(setSuccessToast("Message Updated successfully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  const replyMessage = async () => {
    setLoading(true);
    sendMessage();
    setLoading(false);
    getMessageHistory({
      data: {},
      isScrollToBottom: true,
      initialLoad: true,
    });
  };
  const updateMessageInArray = () => {
    return messages.map(message =>
      message.id === selectedMessage.id
        ? { ...message, message: messageForUpdate }
        : message
    );
  };
  const getMessageHistory = async ({ data, isScrollToBottom, initialLoad }) => {
    const res = await getConversationMessageHistoryAPI({
      conversationId: searchParams.get("conversion"),
      limit: 50,
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
      scrollToBottom();
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
      const payload = {
        message: newMessage.trim(),
        reply_to: messageReplayId,
        content_type: "text",
      };
      for (const key in payload) {
        if (payload[key] === "" || payload[key] === null) {
          delete payload[key];
        }
      }
      ws.sendMessage(payload);
      setNewMessage("");
      setEditorState(EditorState.createEmpty());
      // Scroll to the bottom after sending the message
      scrollToBottom();
    }
  };

  const onMessageReceive = async (message) => {
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
  const getJobSeekerJobApplication = async (jobSeekerId) => {
    const res = await getJobSeekerJobApplicationAPI(jobSeekerId);
    if (res.remote === "success") {
      dispatch(setJobSeekerJobApplication(res.data.results));
    } else {
      dispatch(setJobSeekerJobApplication([]));
    }
  };
  const getVendorTenderApplication = async (vendorId) => {
    const res = await getVendorTenderApplicationAPI(vendorId);
    if (res.remote === "success") {
      dispatch(setVendorTenderApplication(res.data.results));
    } else {
      dispatch(setVendorTenderApplication([]));
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const messageType = (message) => !!message.attachment;
  const renderAttachment = (attachment) => {
    switch (attachment.type) {
      case "image":
        return (
          <Box sx={{ position: "relative" }}>
            <img
              alt="attachment"
              src={generateFileUrl(attachment.path)}
              width={"400px"}
              rel="nofollow"
              onClick={() => {
                setFullImg(generateFileUrl(attachment.path));
                setOpen(true);
              }}
            />
          </Box>
        );
      case "video":
        return (
          <video width="320" height="240" controls>
            <source
              src={generateFileUrl(attachment.path)}
              type="video/mp4"
            ></source>
          </video>
        );
      case "audio":
        return (
          <audio controls>
            <source
              src={generateFileUrl(attachment.path)}
              type="audio/mp3"
            ></source>
          </audio>
        );
      default:
        return (
          <span className="me-2 d-inline-flex">
            <a
              href={generateFileUrl(attachment.path)}
              target="_blank"
              className="m-0"
              rel="noreferrer"
            >
              {" "}
              {attachment.title} <SVG.UploadIcon />
            </a>
          </span>
        );
    }
  };
  const handleOpenList = (action) => {
    setOpenSelectApplicationModal(action);
  };
  // Start Draft JS Implement
  const _onBoldClick = useCallback(() => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    const chatHtml = draftToHtml(convertToRaw(RichUtils.toggleInlineStyle(editorState, "BOLD").getCurrentContent()));
    setNewMessage(chatHtml);
  });
  const _onItalicClick = useCallback(() => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
    const chatHtml = draftToHtml(convertToRaw(RichUtils.toggleInlineStyle(editorState, "ITALIC").getCurrentContent()));
    setNewMessage(chatHtml);
  });
  const _onUnderLineClick = useCallback(() => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
    const chatHtml = draftToHtml(convertToRaw(RichUtils.toggleInlineStyle(editorState, "UNDERLINE").getCurrentContent()));
    setNewMessage(chatHtml);
  });
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const chatHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    setNewMessage(chatHtml);
  };
  // End Draft Js
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // Function to count words
  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    return words.length;
  };
  const getApplicationList = async () => {
    setIsLoading(true);
    const filter = "";
    const res = await getApplicationOnJobAPI({ jobId: applicationDetails.job.id, filter });
    if (res.remote === "success") {
      setTotalRejected(res.data.rejectedCount);
      setTotalShortlisted(res.data.shortlistedCount);
      setTotalPlannedInterview(res.data.plannedInterviewCount);
    }
    setIsLoading(false);
  };

  const getTenderApplicationList = async () => {
    setIsLoading(true);
    const filter = "";
    const res = await getApplicationOnTenderAPI({ tenderId: applicationDetails.tender.id, filter });
    if (res.remote === "success") {
      setTotalRejected(res.data.rejectedCount);
      setTotalShortlisted(res.data.shortlistedCount);
      setTotalPlannedInterview(res.data.plannedInterviewCount);
    }
    setIsLoading(false);
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
    if (jobSeekerJobApplication.length === 1) {
      setApplicationDetails(jobSeekerJobApplication[0]);
    }
    const listForShow = jobSeekerJobApplication.map(application => {
      return {
        label: application.job.title,
        value: application.id
      };
    });
    setApplicationList(listForShow);
  }, [jobSeekerJobApplication]);

  useEffect(() => {
    if (vendorTenderApplication.length === 1) {
      setApplicationDetails(vendorTenderApplication[0]);
    }
    const listForShow = vendorTenderApplication.map(application => {
      return {
        label: application.tender.title,
        value: application.id
      };
    });
    setApplicationList(listForShow);
  }, [vendorTenderApplication]);
  useEffect(() => {
    const fragmentIdentifier = window.location.hash;
    if (fragmentIdentifier) {
      // Remove the '#' symbol from the fragment identifier, if present
      const cleanIdentifier = fragmentIdentifier.slice(1);
      setHashId(cleanIdentifier);
    }
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
    if (userDetails.role === USER_ROLES.jobSeeker) {
      getJobSeekerJobApplication(userDetails.id);
    } else if (userDetails.role === USER_ROLES.vendor) {
      getVendorTenderApplication(userDetails.id);
    } else {
      dispatch(setJobSeekerJobApplication([]));
    }
    setApplicationDetails("");
  }, [userDetails]);
  useEffect(() => {
    if (applicationDetails && applicationDetails?.job?.id) {
      getApplicationList(applicationDetails.job.id);
    }

    if (applicationDetails && applicationDetails?.tender?.id) {
      getTenderApplicationList(applicationDetails.tender.id);
    }
  }, [applicationDetails]);

  useEffect(() => {
    if (userDetails.role === USER_ROLES.jobSeeker) {
      if (applicationDetails?.job?.id) {
        dispatch(
          setTotalApplicationsByJob({
            jobId: applicationDetails.job.id,
            data: {
              shortlisted: totalShortlisted,
              rejected: totalRejected,
              plannedInterview: totalPlannedInterview,
            },
          })
        );
      }
    } else if (userDetails.role === USER_ROLES.vendor) {
      if (applicationDetails?.tender?.id) {
        dispatch(
          setTotalApplicationsByTender({
            tenderId: applicationDetails.tender.id,
            data: {
              shortlisted: totalShortlisted,
              rejected: totalRejected,
              plannedInterview: totalPlannedInterview,
            },
          })
        );
      }
    }
  }, [applicationDetails]);
  useEffect(() => {
    // Add a delay (in milliseconds) before scrolling
    const delayInMilliseconds = 3000; // 2 seconds

    // Function to scroll to the element
    function scrollToElement() {
      const element = document.getElementById(hashId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Use setTimeout to introduce a delay before scrolling
    const scrollTimeout = setTimeout(scrollToElement, delayInMilliseconds);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(scrollTimeout);
  }, [hashId]); // The empty dependency array ensures this effect runs once
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
                {/* <p className="mb-2">Online Research Participant</p> */}
              </div>

              <div>
                <ApplicationOptions details={applicationDetails || { user: userDetails }} view interviewPlanned={userDetails.role === USER_ROLES.jobSeeker} shortlist={role === USER_ROLES.employer} applicationList={applicationList} handleOpenList={(action) => handleOpenList(action)} isApplicationSelect={applicationDetails} />
              </div>

            </Stack>
          </div>
          <div
            className={`meassagebox pe-0 ${styles.scrollbarChatBox}`}
            style={{
              // display: "flex",
              // flexDirection: "column-reverse",
              overflow: "auto",
              overflowX: "hidden",
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
                        } mt-3 pe-2`}
                      key={message.id}
                      id={message.id}
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
                                message.attachment ||
                                  countWords(message.message) > 10
                                  ? ""
                                  : "text-inline old-message"
                              }
                            >
                              {message.reply.id &&
                                <div className="reply-message">
                                  <b className="d-block">{message.replyUserId === currentUser.id ? "You" : message.replyUserName}</b>
                                  {message.reply.attachment
                                    ? <div className="reply-attachment"> {renderAttachment(message.reply.attachment)}</div>
                                    : ""}
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: message.reply.message,
                                    }}
                                  />
                                </div>
                              }
                              <div>
                                {message.attachment
                                  ? renderAttachment(message.attachment)
                                  : ""}
                                {/* <p style={{ wordBreak: "break-word" }}>
                                  {message.message}
                                </p> */}
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: message.message,
                                  }}
                                />
                              </div>
                              <div className={`ms-2 ${styles.chatTime}`}>
                                {dayjs.utc(message.createdAt).local().fromNow()}
                              </div>
                              <div className="edit-message">{message.isEdited && "Edited"}</div>

                              <IconButton
                                size="small"
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={(e) => { handleClickMedia(e, messageType(message)); setSelectedMessage(message); setMessageReplayId(message.id); }} // Open the menu when the IconButton is clicked
                                sx={{
                                  position: "absolute",
                                  top: "-5px",
                                  right: "7px",
                                  zIndex: 1,
                                  width: "25px",
                                  height: "25px",
                                  color: "#274593"
                                }}
                              >
                                <MoreHorizIcon />
                              </IconButton>

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
          <div>
            <MediaControl
              anchorElMedia={anchorElMedia}
              handleMenuCloseMedia={handleMenuCloseMedia}
              option={ImageDataDelete(messageIsMedia,
                (selectedMessage?.user?.id === currentUser?.id))}
              message={selectedMessage}
            />
          </div>
          <div className="chatSection">
            {!isBlackListedByEmployer ? (
              <Stack direction={"row"} spacing={2} alignItems="start">
                <div className="chatinput">
                  <span className="attachment-icon" style={{ position: "relative" }}>
                    <SVG.AttachIcon style={{ position: "relative" }} />
                    <input
                      type="file"
                      onChange={handleAttachment}
                      value={""}
                      style={{
                        position: "absolute",
                        opacity: "0",
                        right: "0",
                        width: "35px",
                      }}
                    />
                  </span>
                  <div className="editor-warp w-100">
                    <Editor
                      // handleKeyCommand={handleKeyCommand}
                      onChange={onEditorStateChange}
                      editorState={editorState}
                      onEditorStateChange={onEditorStateChange}
                      mention={{
                        trigger: "@",
                        separator: " ",
                        // suggestions: mentions,
                      }}
                      onKeyPress={(e) => {
                        if (newMessage && newMessage.trim()) {
                          if (e.key === "Enter" && !e.shiftKey) {
                            sendMessage(e);
                          }
                        }
                      }}
                      placeholder="Write a message…"
                    />
                  </div>
                </div>
                <Stack direction="row" spacing={2}>
                  <IconButton
                    sx={{ border: "1px solid #848484" }}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    style={{
                      border: "1px solid",
                      width: "40px",
                      height: "40px",
                      borderRadius: "100%",
                      marginTop: "3px",
                    }}
                    onClick={handleMenuOpen} // Open the menu when the IconButton is clicked
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    className="menufloting"
                    sx={{
                      "& .MuiMenuItem-root": {
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      },
                    }}
                  >
                    <Stack direction="row" spacing={0.4} className="format-box">
                      <MenuItem
                        onClick={() => {
                          _onBoldClick();
                          setAnchorEl(null);
                          setSelectedFormat("bold");
                        }}
                        className={
                          selectedFormat === "bold"
                            ? "highlighted-menu-item"
                            : ""
                        }
                      >
                        <FormatBoldIcon />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          _onItalicClick();
                          setAnchorEl(null);
                          setSelectedFormat("italic");
                        }}
                        className={
                          selectedFormat === "italic"
                            ? "highlighted-menu-item"
                            : ""
                        }
                      >
                        <FormatItalicIcon />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          _onUnderLineClick();
                          setAnchorEl(null);
                          setSelectedFormat("underline");
                        }}
                        className={
                          selectedFormat === "underline"
                            ? "highlighted-menu-item"
                            : ""
                        }
                      >
                        <FormatUnderlinedIcon />
                      </MenuItem>
                    </Stack>
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
            ) : (
              <span className="text-center">
                You are not longer to chat with employer
              </span>
            )}
          </div>
          <DialogBox open={open} handleClose={handleClose}>
            <img src={fullImg} />
          </DialogBox>
          <DialogBox open={openEditMessage} handleClose={handleClose}>
            <h3>Edit Message</h3>
            <ReactQuill value={messageForUpdate || selectedMessage.message} onChange={(value) => { setMessageForUpdate(value); }} modules={modules}
              formats={formats} />
            <FilledButton
              title={loading ? <Loader loading={loading} /> : "update"}
              disabled={loading}
              onClick={() => { updateMessage(); }}
              sx={{ marginTop: "10px" }}
            />
            <FilledButton
              title="Cancel"
              onClick={() => { setOpenEditMessage(false); setMessageForUpdate(""); }}
              sx={{ marginTop: "10px" }}
            />
          </DialogBox>
          <DialogBox open={openReplyMessage} handleClose={handleClose}>
            <h3>Reply Message</h3>
            <ReactQuill onChange={(value) => { setNewMessage(value); }} modules={modules}
              formats={formats} />
            <FilledButton
              title={loading ? <Loader loading={loading} /> : "Reply"}
              disabled={loading}
              onClick={() => { replyMessage(); setOpenReplyMessage(false); }}
              sx={{ marginTop: "10px" }}
            />
            <FilledButton
              title="Cancel"
              onClick={() => { setOpenReplyMessage(false); setNewMessage(""); }}
              sx={{ marginTop: "10px" }}
            />
          </DialogBox>
          <DialogBox open={openSelectApplicationModal} handleClose={() => setOpenSelectApplicationModal(false)}>
            {(applicationList.length > 0) ? <>
              <div className="dialog-reason">
                <LabeledRadioInputComponent
                  title={`Please select ${(userDetails.role === USER_ROLES.jobSeeker) ? "job" : "tender"} application:`}
                  options={applicationList}
                  onChange={(e) => setApplicationId(e.target.value)}
                  value={applicationId}
                  sx={{
                    "& .MuiFormControlLabel-root .Mui-checked ~ .MuiTypography-root":
                      { fontWeight: 500 },
                    display: "flex",
                    flexDirection: "column",
                    color: "black",
                    fontWeight: "500",
                  }}
                />

              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <OutlinedButton
                  title="Click"
                  onClick={() => {
                    if (userDetails.role === USER_ROLES.jobSeeker) {
                      setApplicationDetails(jobSeekerJobApplication.find((application) => application.id === applicationId));
                    } else {
                      setApplicationDetails(vendorTenderApplication.find((application) => application.id === applicationId));
                    }
                    setOpenSelectApplicationModal(false);
                  }
                  }
                />
                <OutlinedButton
                  title="Cancel"
                  onClick={() => {
                    setOpenSelectApplicationModal(false);
                  }
                  }
                />
              </div></>
              : "No Application Found"}
          </DialogBox>
        </>
      )}
    </>
  );
}

export default ChatBox;
