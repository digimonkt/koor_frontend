import { SVG } from "@assets/svg";
import ApplicationOptions from "@components/applicationOptions";
import { Avatar, IconButton, Stack } from "@mui/material";
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
  const scrollbarRef = useRef();
  const getMessageHistory = async (data, isScrollToBottom) => {
    const res = await getConversationMessageHistoryAPI({
      conversationId: searchParams.get("conversion"),
      limit: 20,
      ...(data || {}),
    });
    if (res.remote === "success") {
      setMessage([...messages, ...res.data.results]);
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
    ws.sendMessage({
      message: newMessage.trim(),
      content_type: "text",
    });
    setNewMessage("");
    // Scroll to the bottom after sending the message
    scrollToBottom();
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
  };
  const checkExistingConversation = async (id) => {
    const res = await getConversationIdByUserIdAPI({
      userId: id,
    });
    console.log({ res });
    if (res.remote === "success") {
      const conversationId = res.data.converesation_id;
      console.log({ conversationId });
      if (conversationId) {
        navigate(urlcat("/employer/chat", { conversion: conversationId }));
      }
    }
  };

  useEffect(() => {
    if (!isScrollToBottom) {
      scrollToBottom();
    }
  }, [isScrollToBottom]);

  useEffect(() => {
    setMessage([]);
    if (searchParams.get("userId")) {
      checkExistingConversation(searchParams.get("userId"));
    }
    if (searchParams.get("conversion")) {
      getMessageHistory({}, true);
    }
  }, [searchParams.get("conversion")]);

  useEffect(() => {
    const data = {
      url: "ws/chat",
      queryParams: {
        conversation_id: searchParams.get("conversion"),
        user_id: searchParams.get("userId"),
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
  }, [searchParams.get("conversion")]);
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="message-header">
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <div className="headerbox">
                <h3>John Doe</h3>
                <p>Job Title</p>
              </div>
              <ApplicationOptions details={{ user: {} }} />
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
                    messageId: messages[messages.length - 1].id,
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
                      className={`${
                        message.user.id === currentUser.id
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
                          className={`w-70 ${
                            message.user.id === currentUser.id
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          <div
                            className={`message-text ${
                              message.user.id === currentUser.id
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
                            <div className="text-inline">
                              <p>{message.message}</p>
                              <span className="ms-2">
                                {dayjs.utc(message.createdAt).local().fromNow()}
                              </span>
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
                <span className="attachment-icon">{<SVG.AttachIcon />}</span>
                {/* <textarea
              placeholder="Write a message…"
              value="Write a message…"
            ></textarea> */}
                <LabeledInput
                  placeholder="Write a message…"
                  type="textarea"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (newMessage.trim()) {
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
                >
                  <MoreHorizIcon />
                </IconButton>

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
        </>
      )}
    </>
  );
}

export default ChatBox;
