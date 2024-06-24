import { Box, Card } from "@mui/material";
import React, { useState } from "react";
import ChatList from "./chatList";
import ChatBox from "./chatBoxRight";
import { useSearchParams } from "react-router-dom";
import { ChatNotSelected } from "../../components/animations";

function ChatComponent() {
  const [searchParams] = useSearchParams();
  const [isSeleted, setIsSeleted] = useState(false);

  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            height: "auto",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            "@media (max-width: 667px)": {
              display: "block",
            },
            py: 2,
          }}
        >
          <Box
            sx={{
              width: { sm: "35%", lg: "30%" },
            }}
            className="leftchatbox"
          >
            {!isSeleted && <ChatList setIsSeleted={setIsSeleted} />}
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              padding: "16px 16px 0px 16px",
              width: { sm: "65%", lg: "70%" },
            }}
          >
            {searchParams.get("conversion") || searchParams.get("userId") ? (
              <ChatBox setIsSeleted={setIsSeleted} />
            ) : (
              <>
                <ChatNotSelected title="You haven't made any conversation selections." />
              </>
            )}
          </Box>
        </Box>
      </Card>
    </>
  );
}

export default ChatComponent;
