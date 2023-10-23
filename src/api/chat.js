import api from ".";
import urlcat from "urlcat";
import {
  transformConversationResponse,
  transformMessageResponse,
} from "./transform/chat";

export const getConversationListAPI = async (search) => {
  const res = await api.request({
    url: urlcat("v1/chat/conversations", { search }),
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: {
        count: res.data.count,
        next: res.data.next,
        previous: res.data.previous,
        results:
          res.data.results?.map((data) =>
            transformConversationResponse(data)
          ) || [],
      },
    };
  }
  return res;
};

export const getConversationMessageHistoryAPI = async ({
  conversationId,
  ...rest
}) => {
  const res = await api.request({
    url: urlcat("v1/chat/:conversationId/history", { conversationId, ...rest }),
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

export const sendAttachmentAPI = async (data) => {
  return await api.request({
    url: urlcat("v1/chat/attachment"),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
};

export const deleteMessageAttachmentAPI = async (messageId) => {
  const res = await api.request({
    url: urlcat("v1/chat/message/:messageId", { messageId }),
    method: "DELETE",
  });
  if (res.remote === "success") {
    return res;
  }
  return res;
};
export const updateMessageAttachmentAPI = async (messageId, messageForUpdate) => {
  console.log({ messageId, messageForUpdate });
  const res = await api.request({
    url: urlcat("v1/chat/message/:messageId", { messageId }),
    method: "PUT",
    data: { message: messageForUpdate }
  });
  if (res.remote === "success") {
    return res;
  }
  return res;
};
