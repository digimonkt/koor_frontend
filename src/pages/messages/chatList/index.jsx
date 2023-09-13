import { USER_ROLES } from "@utils/enum";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Divider, Stack } from "@mui/material";
import styles from "../message.module.css";
import { getConversationListAPI } from "@api/chat";
import { NoDataFoundAnimation } from "@components/animations";
import { useNavigate, useSearchParams } from "react-router-dom";
import { WebSocketClient } from "@utils/constants/websocket";
import { transformConversationResponse } from "@api/transform/chat";
import { useDebounce } from "usehooks-ts";
function ChatList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { role } = useSelector((state) => state.auth);
  const [chatList, setChatList] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearchValue = useDebounce(search, 500);
  const getConversationList = async () => {
    setInitialLoading(true);
    const res = await getConversationListAPI(search);

    if (res.remote === "success") {
      setChatList(res.data.results);
    }
    setInitialLoading(false);
  };

  const onUpdateChatActivity = (data) => {
    console.log({ activity: data.content });
    const updatedConversations = data.content.map((conversation) =>
      transformConversationResponse(conversation)
    );
    setChatList([...updatedConversations]);
  };

  useEffect(() => {
    const data = {
      url: "ws/chat_activity",
    };
    const ws = new WebSocketClient(data);
    ws.connect();
    ws.onMessage(onUpdateChatActivity);
    // Clean up WebSocket connection when component unmounts
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
      <div className="searchmessage">
        <div className="searchmessage-icon">
          <input className="chat-search" placeholder="Search" onChange={(e) => { setSearch(e.target.value); }} />
        </div>
      </div>

      <div
        className={`chatbox ${role === USER_ROLES.jobSeeker ? "jobseekerbox" : null
          }`}
        style={{ overflow: "auto" }}
        onScroll={(e) => {
          const { scrollTop, clientHeight, scrollHeight } = e.target;
          console.log(
            { scrollHeight, scrollTop, clientHeight },
            scrollHeight - scrollTop === clientHeight
          );
        }}
      >
        <ul>
          {initialLoading ? (
            "Loading..."
          ) : !chatList.length ? (
              <NoDataFoundAnimation title="No conversation found." />
          ) : (
            chatList.map((chat) => {
              return (
                <li
                  key={chat.id}
                  onClick={() => {
                    navigate(`?conversion=${chat.id}&userId=${chat.user.id}`);
                  }}
                  style={{
                    background:
                      searchParams.get("conversion") === chat.id
                        ? "#feefd3"
                        : "",
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      sx={{
                        width: "70px",
                        height: "70px",
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
                      <p className={`${styles.lastMessage}`}>
                        {chat.lastMessage.message}
                      </p>
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
