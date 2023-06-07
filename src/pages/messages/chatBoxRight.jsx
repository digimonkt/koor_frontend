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

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(relativeTime);

function ChatBox() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { role, currentUser } = useSelector((state) => state.auth);
  const [messages, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ws, setWs] = useState(null);
  const scrollbarRef = useRef();

  const getMessageHistory = async (data) => {
    setIsLoading(true);
    const res = await getConversationMessageHistoryAPI({
      conversationId: searchParams.get("conversion"),
    });
    if (res.remote === "success") {
      setMessage(res.data.results);
    }
    setIsLoading(false);
  };

  const sendMessage = async (e) => {
    if (e) {
      event.preventDefault();
      event.stopPropagation();
    }
    ws.sendMessage({
      message: newMessage,
      content_type: "text",
    });
    setNewMessage("");
    // Scroll to the bottom after sending the message
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollTop = scrollbarRef.current.scrollHeight;
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
    setMessage([]);
    if (searchParams.get("userId")) {
      checkExistingConversation(searchParams.get("userId"));
    }
    if (searchParams.get("conversion")) {
      getMessageHistory();
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
            className="meassagebox pe-0"
            style={{ display: "flex", flexDirection: "column-reverse" }}
          >
            <PerfectScrollbar
              className="pe-4"
              ref={scrollbarRef}
              style={{
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              {messages.map((message) => {
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
            </PerfectScrollbar>
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
                    if (e.key === "Enter" && !e.shiftKey) {
                      sendMessage(e);
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
