import urlcat from "urlcat";
import { getConversationIdByUserIdAPI } from "../api/chat";

export const chatRedirector = async (userId, navigateFn) => {
  try {
    const res = await getConversationIdByUserIdAPI({
      userId,
    });
    console.log(res);

    if (res.remote === "success") {
      const conversationId = res.data?.conversation_id;
      navigateFn(
        urlcat("/employer/chat", {
          conversion: conversationId,
          userId,
        }),
      );
    }
  } catch (error) {
    console.error("Error handling message click:", error);
  }
};
