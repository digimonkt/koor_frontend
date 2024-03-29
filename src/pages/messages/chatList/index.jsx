import { USER_ROLES } from "../../../utils/enum";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Divider, IconButton, Stack } from "@mui/material";
// import styles from "../message.module.css";
import {
  getConversationListAPI,
  getJobSeekerJobApplicationAPI,
} from "../../../api/chat";
import { NoDataFoundAnimation } from "../../../components/animations";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { WebSocketClient } from "../../../utils/constants/websocket";
import { transformConversationResponse } from "../../../api/transform/chat";
import { useDebounce } from "usehooks-ts";
import { setIsBlackListedByEmployer } from "../../../redux/slice/user";
import { setJobSeekerJobApplication } from "@redux/slice/employer";
import { SVG } from "@assets/svg";
import { Capacitor } from "@capacitor/core";
function ChatList({ setIsSeleted }) {
  const platform = Capacitor.getPlatform();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { role } = useSelector((state) => state.auth);
  const [chatList, setChatList] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearchValue = useDebounce(search, 500);
  const dispatch = useDispatch();
  const getConversationList = async () => {
    setInitialLoading(true);
    const res = await getConversationListAPI(search);
    if (res.remote === "success") {
      setChatList(res.data.results);
    }
    setInitialLoading(false);
  };

  const onUpdateChatActivity = (data) => {
    const updatedConversations = data.content.map((conversation) =>
      transformConversationResponse(conversation),
    );
    setChatList([...updatedConversations]);
  };
  const handleBlacklistStatus = (status) => {
    dispatch(setIsBlackListedByEmployer(status));
  };
  const handleJobSeekerJobApplication = (user) => {
    if (user.role === USER_ROLES.jobSeeker) {
      getJobSeekerJobApplication(user.id);
    }
    if (setIsSeleted) {
      setIsSeleted(true);
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

  useEffect(() => {
    const data = {
      url: "ws/chat_activity",
    };
    const ws = new WebSocketClient(data);
    ws.connect();
    ws.onMessage(onUpdateChatActivity);

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    getConversationList();
  }, []);

  useEffect(() => {
    getConversationList(search);
  }, [debouncedSearchValue]);
  return (
    <>
      <h3 className="chat_message_text">
        Messages
        <IconButton LinkComponent={Link} to="/notification">
          <SVG.NotificationIcon />
        </IconButton>
      </h3>
      <div className="searchmessage">
        <div className="searchmessage-icon">
          <input
            className="chat-search"
            placeholder="Search messages"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div
        className={`chatbox ${
          role === USER_ROLES.jobSeeker ? "jobseekerbox" : null
        }`}
        style={{ overflow: "auto" }}
        onScroll={(e) => {
          const { scrollTop, clientHeight, scrollHeight } = e.target;
          console.log(
            { scrollHeight, scrollTop, clientHeight },
            scrollHeight - scrollTop === clientHeight,
          );
        }}
      >
        <ul>
          {initialLoading ? (
            <li style={{ textAlign: "center" }}>Loading...</li>
          ) : !chatList.length ? (
            <NoDataFoundAnimation title="No conversation found." />
          ) : (
            chatList.map((chat) => {
              return (
                <li
                  key={chat.id}
                  onClick={() => {
                    handleBlacklistStatus(chat.blacklistedByEmployer);
                    handleJobSeekerJobApplication(chat.user);
                    navigate(`?conversion=${chat.id}&userId=${chat.user.id}`);
                  }}
                  style={{
                    background:
                      searchParams.get("conversion") === chat.id
                        ? "#feefd3"
                        : "",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width:
                          platform === "android" || platform === "ios"
                            ? "40px"
                            : "70px",
                        height:
                          platform === "android" || platform === "ios"
                            ? "40px"
                            : "70px",
                        background: "#F0F0F0",
                        color: "#CACACA",
                      }}
                      alt="userImage"
                      src={chat.user.image}
                    />
                    <div className="chatuser-text">
                      <h3>
                        {chat.user.name}
                        {/* <small>{items.starIcon}</small> */}
                        {/* <span
                          className={`count ${
                            role === USER_ROLES.jobSeeker ? "jobcount" : ""
                          }`}
                        >
                          2
                        </span> */}
                      </h3>
                      <h6>{chat.jobTitle}</h6>
                      {/* <p className={`${styles.lastMessage}`}>
                        {chat.lastMessage.message.slice(0, 15)}
                      </p> */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: chat.lastMessage.message,
                        }}
                      />
                    </div>
                  </Stack>
                  <Divider className="mb-2" />
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
}

export default ChatList;
