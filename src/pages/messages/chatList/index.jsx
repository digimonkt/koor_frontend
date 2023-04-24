import { USER_ROLES } from "@utils/enum";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GenerateFakeChatList } from "../helper";
import { Avatar, Divider, Stack } from "@mui/material";
import styles from "../message.module.css";
function ChatList() {
  const { role } = useSelector((state) => state.auth);
  const [chatList, setChatList] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const generateUser = GenerateFakeChatList(10);
    setTimeout(() => {
      setChatList(generateUser);
      setInitialLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="searchmessage">
        <div className="searchmessage-icon">
          <input className="chat-search" placeholder="Search" />
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
            scrollHeight - scrollTop === clientHeight
          );
        }}
      >
        <ul>
          {initialLoading
            ? "Loading..."
            : chatList.map((chat) => {
                return (
                  <li key={chat.id}>
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
                          <span
                            className={`count ${
                              role === USER_ROLES.jobSeeker ? "jobcount" : ""
                            }`}
                          >
                            2
                          </span>
                        </h3>
                        <h6>{chat.jobTitle}</h6>
                        <p className={`${styles.lastMessage}`}>
                          {chat.lastMessage}
                        </p>
                      </div>
                    </Stack>
                    <Divider className="mb-2" />
                  </li>
                );
              })}
        </ul>
      </div>
    </>
  );
}

export default ChatList;
