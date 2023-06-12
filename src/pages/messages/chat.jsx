import { Box, Card } from "@mui/material";
import React from "react";
import ChatList from "./chatList";
import ChatBox from "./chatBoxRight";
import { useSearchParams } from "react-router-dom";
import { ChatNotSelected } from "@components/animations";

function ChatComponent() {
  const [searchParams] = useSearchParams();
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
              width: { sm: "25%" },
            }}
            className="leftchatbox"
          >
            <ChatList />
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              padding: "16px",
              width: { sm: "75%" },
            }}
          >
            {searchParams.get("conversion") || searchParams.get("userId") ? (
              <ChatBox />
            ) : (
              <ChatNotSelected title="You haven't made any conversation selections." />
            )}
          </Box>
        </Box>
      </Card>
    </>
  );
}

export default ChatComponent;
