import api from ".";
import urlcat from "urlcat";
import {
  transformConversationResponse,
  transformMessageResponse,
} from "./transform/chat";

export const getConversationListAPI = async () => {
  const res = await api.request({
    url: "v1/chat/conversations",
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: {
        count: res.data.count,
        next: res.data.next,
        previous: res.data.previous,
        results: res.data.results.map((data) =>
          transformConversationResponse(data)
        ),
      },
    };
  }
  return res;
};

export const getConversationMessageHistoryAPI = async ({ conversationId }) => {
  const res = await api.request({
    url: urlcat("v1/chat/:conversationId/history", { conversationId }),
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: {
        count: res.data.count,
        next: res.data.next,
        previous: res.data.previous,
        results: res.data.results.map((result) =>
          transformMessageResponse(result)
        ),
      },
    };
  }
  return res;
};

export const getConversationIdByUserIdAPI = async ({ userId }) => {
  return await api.request({
    url: urlcat("v1/chat/conversations/:userId", { userId }),
  });
};
